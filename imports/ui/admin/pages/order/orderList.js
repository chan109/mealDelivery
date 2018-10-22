import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import swal from 'sweetalert2';
import { moment } from 'meteor/momentjs:moment';

import Orders from '../../../../api/orders/models/orders';
import { sessionManager, } from '../../../delivery/utils';
import './orderList.html';
import './allOrders/showOrderModel';

Template.adminOrderList.onCreated(function() {
  Meteor.subscribe('user.list');
  Meteor.subscribe('dishes.list');
  Meteor.subscribe('orders.list');
});

Template.adminOrderList.helpers({
  allOrders() {
    return Orders.find({ status: { $in: ['已下单', '派送中'] } }, { sort: { orderedAt: -1 } }).fetch();
  },
  orderedDate() {
    return moment(this.orderedAt).format('lll');
  },
});

Template.adminOrderList.events({
  'click .viewOrder'() {
    Session.set(sessionManager.CLICKEDORDERSESSION, this);
  },
  'click .cancelOrder'() {
    swal({
      title: '确认取消?',
      text: '取消之后无法恢复',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then((result) => {
      if (result.value) {
        Meteor.call('Orders.cancel', { orderId: this._id }, (err) => {
          if (err) {
            alert(err.reason);
          }
        });
      }
    });
  }
});