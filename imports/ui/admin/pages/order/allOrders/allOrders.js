import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { _ } from 'meteor/erasaur:meteor-lodash';
import { moment } from 'meteor/momentjs:moment';

import Orders from '../../../../../api/orders/models/orders';
import { sessionManager, AREATABLE } from '../../../../delivery/utils';
import './showOrderModel';
import './allOrders.html';

Template.adminAllOrder.onCreated(function() {
  Meteor.subscribe('orders.listByCityName', AREATABLE[Session.get(sessionManager.SELECTCITY)]);
  Meteor.subscribe('user.listByCityName', Session.get(sessionManager.SELECTCITY));
  Meteor.subscribe('user.list');
});

Template.adminAllOrder.helpers({
  orders() {
    const status = Session.get(sessionManager.SELECTED_ORDER_STATUS);
    const query = {
      'address.city': AREATABLE[Session.get(sessionManager.SELECTCITY)]
    };
    if (status) {
      query.status = status;
    } else {
      _.omit(query, 'status');
    }
    return Orders.find(query, { sort: { orderedAt: -1 } }).fetch();
  },
  orderedDate() {
    return moment(this.orderedAt).format('lll');
  },
  orderPhone() {
    const orderedBy = Meteor.users.findOne(this.orderedBy);
    return orderedBy && orderedBy.phone.number;
  },
  riders() {
    return Meteor.users.find({ role: 'rider', city: Session.get(sessionManager.SELECTCITY) }).fetch();
  },
  isPaid() {
    return this.status === '已下单';
  }
});

Template.adminAllOrder.events({
  'click .viewOrder'() {
    Session.set(sessionManager.CLICKEDORDERSESSION, this);
  },
  'click #assignOrder'() {
    const orderIds = $('.selectOrderCheckbox:checked').map(function() {
      return this.value;
    }).get();
    const riderId = $('#riderSelect').val();
    Meteor.call('Orders.assign', { riderId, orderIds }, (err) => {
      if (err) {
        alert(err.reason);
      }
    });
  },
  'click .orderStatusBtn'(e) {
    Session.set(sessionManager.SELECTED_ORDER_STATUS, $(e.target).attr('value'));
  }
});
