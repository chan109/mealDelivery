import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { moment } from 'meteor/momentjs:moment';
import { sessionManager } from '../../../../delivery/utils';
import Dishes from '../../../../../api/menu/models/dishes';
import Menus from '../../../../../api/menu/models/menus';
import './showOrderModel.html';

Template.adminShowOrderDetail.onCreated(function() {
  Meteor.subscribe('dishes.list');
  Meteor.subscribe('menus.list');
});

Template.adminShowOrderDetail.helpers({
  orderDetail() {
    const clickedOrder = {
      ...Session.get(sessionManager.CLICKEDORDERSESSION),
      orderedAt: moment(this.orderedAt).format('YYYY/MM/DD')
    };
    if (clickedOrder) {
      return clickedOrder;
    }
    return null;
  },
  dishData() {
    const menus = Menus.findOne(this.menu);
    return Dishes.findOne(menus.dishId);
  },
  riderData() {
    return Meteor.users.findOne(this.rider);
  },
  userData() {
    return Meteor.users.findOne(this.orderedBy);
  },
  unitNumber() {
    if (this.address.unitNumber !== null && this.address.unitNumber !== '') {
      return { uNum: this.address.unitNumber };
    }
    return false;
  }
});

Template.adminShowOrderDetail.events({
  'click #meteor-address-helper' () {
    window.open(this.address.url);
  }
});