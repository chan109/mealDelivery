import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert2';

import { AREATABLE } from '../../../delivery/utils';
import './user.html';

Template.adminUserTable.onCreated(() => {
  Meteor.subscribe('user.list');
});

Template.adminUserTable.onRendered(() => {
  setTimeout(function() {
    $('#datatables').DataTable();
  }, 100);
});

Template.adminUserTable.helpers({
  users() {
    return Meteor.users.find({ });
  },
  processing() {
    return this.becomingRider && this.role === 'customer';
  },
  passed() {
    return this.role === 'rider';
  },
  nothing() {
    return (this.role === 'customer' && !this.becomingRider) || (this.role === 'admin');
  },
  locations() {
    let temp = AREATABLE;
    let temp2 = [];
    for (let key in temp) temp2.push({name:key,value:temp[key]});

    return temp2;
  }
});

Template.adminUserTable.events({
  'change .power select' (e) {
    let newRole = e.target.value;
    if (newRole === '普通用户') {
      newRole = 'customer';
      Meteor.call('User.statusUpdateByID', { userId: this._id, becomingRider: false });
    } else if (newRole === '送餐员') {
      newRole = 'rider';
    }

    const args = {
      userId: this._id,
      newRole
    };

    Meteor.call('User.userRoleUpdate', args);
  },
  'change .locationArea select' (e) {
    const assignedArea = e.target.value;

    const args = {
      userId: this._id,
      city: assignedArea
    };
    Meteor.call('User.areaUpdate', args);
  },
  'click .blockUser'() {
    Meteor.call('User.toggleblock', { userId: this._id, isBlocked: this.isBlocked }, (err) => {
      if (err) {
        alert(err.reason);
      }
    });
  }
});

