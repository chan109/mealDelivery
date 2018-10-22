import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { moment } from 'meteor/momentjs:moment';

import { myAppManager, sessionManager } from '../../../utils';
import './existingOrders.html';
import Dishes from '../../../../../api/menu/models/dishes';
import Menus from '../../../../../api/menu/models/menus';


Template.existignOrders.helpers({
  dishData() {
    const dishData = Menus.findOne({ _id: this.menu });
    return Dishes.findOne({ _id: dishData.dishId });
  },
  orderedDate() {
    return moment(this.orderedAt).format('YYYY/MM/DD hh:mm a');
  },
  maskedPhone() {
    if (this.rider == null || this.rider === '') return false;
    const handle = Meteor.subscribe('user.listById', this.rider);
    if (handle.ready()) {
      const phone = Meteor.users.findOne({ _id: this.rider }).phone.number;
      return phone.slice(phone.length - 4, phone.length);
    }
    return null;
  }
});

Template.existignOrders.events({
  'click .cancel-order'() {
    myAppManager.dialog.confirm('', '确定要取消订单吗?', function () {
      Meteor.call('Orders.delete', { _id: this.order._id });
      myAppManager.dialog.alert('取消订单成功', '');
    });
  },
  'click .click-helper'() {
    Session.set(sessionManager.CLICKEDORDERSESSION, this);
    Session.set(sessionManager.HEADERTITLESESSION, '订单详情');
    FlowRouter.go('/orderDetail');
    Session.set('page', 'orderDetail');
  }
});