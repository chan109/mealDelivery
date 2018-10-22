import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { moment } from 'meteor/momentjs:moment';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Dishes from '../../../../../api/menu/models/dishes';

import { sessionManager } from '../../../utils';

import './riderOrder.html';

Template.riderOrders.onCreated(() => {
  Meteor.subscribe('dishes.list');
  Meteor.subscribe('user.list');
});

Template.riderOrders.helpers({
  order() {
    const temp = {
      ...this,
      orderedAt: moment(this.orderedAt).format('hh:mm a'),
      userPhone: Meteor.users.findOne(this.orderedBy).phone.number,
      price: this.paidAmount,
      orderedAtBackup: moment(this.orderedAt).format(),
      // deliveredAt: { time: moment(this.deliveredAt).format('hh:mm') },
      orderedDate: moment(this.orderedAt).format('YYYY/MM/DD')
    };
    if (this.deliveredAt != null) {
      temp.deliveredAt = { time: moment(this.deliveredAt).format('hh:mm a') };
    }
    return temp;
  },
  isNotFinished() {
    return Session.get(sessionManager.ISFINISHED) === false;
  },
  unitNumber() {
    if (this.address.unitNumber != null && this.address.unitNumber !== '') {
      return { uNum: this.address.unitNumber };
    }
    return false;
  }
});


Template.riderOrders.events({
  'click .riderOrders'() {
    let allForOne = {};

    const temp = [];
    this.orders.forEach((data) => {
      const d = Dishes.find({ _id: data.dish }).fetch();
      if (d.length === 1) {
        temp.push({
          dish: d[0],
          quantity: data.quantity
        });
      }
    });

    this.orderedAt = moment(this.orderedAt).format('YYYY/MM/DD');

    allForOne = {
      order: this,
      dishes: temp
    };
    Session.set(sessionManager.CLICKEDORDERSESSION, allForOne);
    Session.set(sessionManager.HEADERTITLESESSION, this.orderNumber);
    FlowRouter.go('/riderChannel/detail');
  },
  'click .google-redirect' () {
    window.open(this.address.url);
  },
  'click .complete-order' () {
    Meteor.call('Orders.complete', { orderId: this._id });
  }
});
