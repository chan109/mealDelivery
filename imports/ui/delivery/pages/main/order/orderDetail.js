import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import Dishes from '../../../../../api/menu/models/dishes';
import './orderDetail.html';

const SELECTEDORDER = 'selectedOrder';

Template.orderDetail.onCreated(() => {
  Meteor.subscribe('dishes.list');
});


Template.orderDetail.helpers({
  orderDetail() {
    const dishes = Session.get(SELECTEDORDER);
    return dishes.filter(d => d.quantity > 0);
  },
  dishData() {
    return Dishes.findOne({ _id: this.order.dishId });
  }
});