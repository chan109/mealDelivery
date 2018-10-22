import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/erasaur:meteor-lodash';
import Dishes from '../../../../../api/menu/models/dishes';

import { sessionManager, myAppManager, utilHelpers } from '../../../utils';
import './orderItemsSection.html';

const SELECTEDORDER = 'selectedOrder';

Template.orderedItems.helpers({
  getPayment() {
    const temp = Session.get(SELECTEDORDER);
    if (temp == null || temp.length === 0) return { totalPrice: 0, totalItems: 0 };
    let totalItems = temp.map(data => data.quantity);
    totalItems = totalItems.reduce((accumulator, value) => accumulator + value);
    let totalPrice = temp.map((data) => {
      // data.order.price * data.quantity);
      const t1 = Dishes.findOne({ _id: data.order.dishId });
      return utilHelpers.roundUp(t1.price * data.quantity, 2);
    });
    totalPrice = totalPrice.reduce((accumulator, value) => Number(accumulator) + Number(value));
    totalPrice = utilHelpers.roundUp(totalPrice, 2);
    Session.set(sessionManager.TOTALPRICE, totalPrice);
    return { totalItems, totalPrice };
  },
  enableCheckout() {
    const orders = Session.get(SELECTEDORDER);
    if (!orders || orders.length === 0) return null;
    const totalQuantity = _.sum(orders.map(o => o.quantity));

    return totalQuantity > 0;
  }
});

Template.orderedItems.events({
  'click .submit'() {
    if (Session.get(sessionManager.LOCATIONSESSION) === '') {
      myAppManager.dialog.alert('请输入送餐地址', '提示', function() {
        FlowRouter.go('/updateLocation');
        return null;
      });
    } else if (Session.get('block') === true) {
      myAppManager.dialog.alert('请输入送餐地址', '提示', function() {
        FlowRouter.go('/updateLocation');
        return null;
      });
    } else {
      Session.set('headerTitle', '请确认订单信息');
      FlowRouter.go('/order');
      Session.set('page', 'order');
    }
  }
});