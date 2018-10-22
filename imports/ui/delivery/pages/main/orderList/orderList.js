import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import Orders from '../../../../../api/orders/models/orders';
import './orderList.html';
import './existingOrders';

Template.orderList.onCreated(() => {
  Meteor.subscribe('orders.listById');
});

Template.orderList.helpers({
  orderList() {
    return Orders.find({ orderedBy: Meteor.userId() }, { sort: { orderedAt: -1 } }).fetch();
  },
});
