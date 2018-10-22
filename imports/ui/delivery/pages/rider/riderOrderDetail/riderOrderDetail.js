import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { sessionManager } from '../../../utils';
import Dishes from '../../../../../api/menu/models/dishes';
import Menus from '../../../../../api/menu/models/menus';


import './riderOrderDetail.html';

Template.riderOrderDetail.onCreated(function() {
  Meteor.subscribe('menus.list');
});

Template.riderOrderDetail.helpers({
  everything () {
    if (Session.get(sessionManager.CLICKEDORDERSESSION) == null) return null;
    const allForOne = Session.get(sessionManager.CLICKEDORDERSESSION);
    return allForOne;
  },
  everythingString () {
    if (Session.get(sessionManager.CLICKEDORDERSESSION) == null) return null;
    const allForOne = JSON.stringify(Session.get(sessionManager.CLICKEDORDERSESSION));
    return allForOne;
  },
  orderDetail () {
    if (Session.get(sessionManager.CLICKEDORDERSESSION) == null) return null;
    const allForOne = Session.get(sessionManager.CLICKEDORDERSESSION);
    // user ORderById to get the phone number;
    Meteor.subscribe('user.listById', allForOne.order.orderedBy);

    const phoneNumber = Meteor.users.findOne({ _id: allForOne.order.orderedBy });
    if (phoneNumber == null) return null;
    const orderDetail = {
      orderNumber: allForOne.order.orderNumber,
      orderedAt: moment(allForOne.order.orderedAtBackup).format('YYYY/MM/DD hh:mm a'),
      // contactPerson: 'michael',
      contactNumber: phoneNumber.phone.number,
      address: allForOne.order.address.name,
      notes: allForOne.order.notes,
      expectedDate: allForOne.order.expectedDate
    };
    return orderDetail;
  },
  totalAndDishDetail() {
    if (Session.get(sessionManager.CLICKEDORDERSESSION) == null) return null;
    const allForOne = Session.get(sessionManager.CLICKEDORDERSESSION);
    return { paidAmount: allForOne.order.paidAmount };
  },
  dishes() {
    if (Session.get(sessionManager.CLICKEDORDERSESSION) == null) return null;
    const allForOne = Session.get(sessionManager.CLICKEDORDERSESSION);
    return allForOne.order.orders;
  },
  dishData() {
    const menus = Menus.findOne({ _id: this.menu });
    return Dishes.findOne({ _id: menus.dishId });
  },
  additionalFees () {
    return [
      {
        name: '配送费',
        price: 0
      },
      {
        name: '包装费',
        price: 0
      },
    ];
  },
  isNotFinished() {
    return Session.get(sessionManager.ISFINISHED) === false;
  }
});

Template.riderOrderDetail.events({
  'click .complete-order' () {
    console.log(Session.get(sessionManager.CLICKEDORDERSESSION) == null);
    if (Session.get(sessionManager.CLICKEDORDERSESSION) == null) return null;
    Meteor.call('Orders.complete', { orderId: Session.get(sessionManager.CLICKEDORDERSESSION).order._id });
    FlowRouter.go('/riderChannel');
  }
});