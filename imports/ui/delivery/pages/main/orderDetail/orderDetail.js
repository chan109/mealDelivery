import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { moment } from 'meteor/momentjs:moment';

import './orderDetail.html';
import './customerForm';
import { sessionManager } from '../../../utils';
import Dishes from '../../../../../api/menu/models/dishes';
import Menus from '../../../../../api/menu/models/menus';


Template.orderDetailTwo.onCreated(() => {
  Meteor.subscribe('order.list');
  Meteor.subscribe('dishes.list');
  Meteor.subscribe('user.list');
  Meteor.subscribe('menus.list');
});

Template.orderDetailTwo.helpers({
  orderDetail() {
    return Session.get(sessionManager.CLICKEDORDERSESSION);
  },
  orderedDate() {
    return moment(this.orderedAt).format('YYYY-MM-DD hh:mm a');
  },
  deliveredDate() {
    if (this.deliveredAt != null) {
      return moment(this.deliveredAt).format('YYYY-MM-DD hh:mm a');
    }
    return null;
  },
  dishData() {
    const menu = Menus.findOne(this.menu);
    return Dishes.findOne(menu.dishId);
  },
  priceBeforeTax() {
    const { paidAmount, tips, tax, discount } = this;
    return parseFloat(paidAmount - tips - tax + discount.discount).toFixed(2);
  },
  isDelivering() {
    return this.status === '派送中';
  },
  isDelivered() {
    return this.status === '已派送';
  },
  deliver_guy_info() {
    return Meteor.users.findOne({ _id: this.rider });
  }
});
