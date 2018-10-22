import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { utilHelpers, sessionManager, myAppManager } from '../../../utils';

import './order.html';
import './customer';
import './couponSection';
import './orderDetail';
import './orderDetailFinal';
import './paymentMethod';
import './tipSection';
import './expectedDate';

const HEADERTITLESESSION = 'headerTitle';
const SELECTEDORDER = 'selectedOrder';
const ORDERCHECKOUT = 'orderCheckout';
const TAXRATE = 0.05;

Template.order.events({
  'submit'(event) {
    // Retrives all the informations needed for order creation.
    event.preventDefault();
    const allOrders = Session.get(SELECTEDORDER);
    const paymentDetail = Session.get(ORDERCHECKOUT);

    // const orderNumber generated by the server
    // const orderedAt modified by the server
    // const orderBy set by the server

    // const deliveredAt = new Date(); // 对应于请确认订单信息的时间信息 field??

    // TODO
    const deliveryFee = 0;
    let discountObj = {};
    let discount = { discount: 0, objectId: '' };
    if (event.target.coupons.value !== '无') {
      discountObj = JSON.parse(event.target.coupons.value);
      discount = {
        discount: discountObj.discount,
        objectId: discountObj.objectId
      };
    }

    // const discount = event.target.coupons.value === '无' ? 0 : Number(discountObj.discount);

    const orders = allOrders.map(function(data) {
      return { menu: data.order._id, quantity: data.quantity };
    });

    const location = Session.get(sessionManager.LOCATIONSESSION);
    const address = {
      name: location.formatted_address,
      postCode: location.address_components[location.address_components.length - 1].long_name,
      city: location.vicinity.toLowerCase(),
      unitNumber: location.unitNumber,
      url: location.url
    };
    const paidAmount = paymentDetail.finalTotalPrice;
    const orderedAt = new Date((event.target.time.value));
    const notes = event.target.notes.value;
    const status = '已下单';
    // const tax = Number(utilHelpers.roundUp(paymentDetail.priceBeforeTax * TAXRATE, 2));
    const tax = Number(utilHelpers.roundUp(paymentDetail.tax, 2));

    const tips = paymentDetail.tipsAmount;
    const paymentMethod = event.target.paymentMethod.value;
    const phone = event.target.phoneNumber.value;
    const expectedDate = event.target.expectedTime.value;
    if (expectedDate === '无') {
      myAppManager.dialog.alert('请选择期待收餐时间', '提醒');
      return null;
    }
    const allForOne = {
      orderedAt,
      phone,
      address,
      notes,
      orders,
      deliveryFee,
      tax,
      tips,
      discount,
      paidAmount,
      paymentMethod,
      status,
      isHurry: false,
      expectedDate
    };
    Meteor.call('Orders.insert', allForOne, (err) => {
      if (!err) {
        const bb = utilHelpers.toDomainobject(Session.get(sessionManager.LOCATIONSESSION));
        Meteor.call('User.addressUpdate', bb);
        Session.set(SELECTEDORDER, undefined);
        Session.set(ORDERCHECKOUT, undefined);
        Session.set(sessionManager.DISCOUNT, undefined);
        Session.set(HEADERTITLESESSION, '订单列表');
        FlowRouter.go('/');
        Session.set('page', 'order');
        $('.tab-link').removeClass('tab-link-active');
        $("a[page|='order']").addClass('tab-link-active');
      } else {
        console.log(err);
      }
    });
  }
});