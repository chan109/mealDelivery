import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { check } from 'meteor/check';

import { sessionManager, utilHelpers } from '../../../utils';
import './couponSection.html';
import Coupons from '../../../../../api/coupon/models/coupons';

const ORDERCHECKOUT = 'orderCheckout';
const TIPSPERCENTAGE = 'tipsPercentage';
const TAXRATE = 0.05;


Template.couponSection.helpers({
  coupons() {
    if (Meteor.user() == null) return null;
    return Meteor.user().coupons.filter(c => !c.isUsed);
  },
  coupon() {
    Meteor.subscribe('coupons.listById', this.couponId);
    return Coupons.findOne(this.couponId);
  },
  couponValue() {
    Meteor.subscribe('coupons.listById', this.couponId);
    let temp1 = Coupons.findOne(this.couponId);
    if (temp1 == null || temp1.length === 0) return null;
    temp1 = temp1.discount;
    return JSON.stringify({ discount: temp1, objectId: this.id });
  }
});

Template.couponSection.events({
  'change .couponSelect'(event) {
    let discountAmount = 0;
    if (event.target.value !== '无') {
      const parseDiscoutData = JSON.parse(event.target.value);
      discountAmount = Number(parseDiscoutData.discount);
    }
    Session.set(sessionManager.DISCOUNT, discountAmount);

    // const totalExceptTax = getTotalExceptTax();
    const totalExceptTax = Number(Session.get(sessionManager.TOTALPRICE));
    if (totalExceptTax - discountAmount <= 0) {
      return { tipsAmount: 0, finalTotalPrice: 0 };
    }

    const orderTotal = {};
    let tipsPercentage = 10;

    if (Session.get(TIPSPERCENTAGE) == null) {
      Session.set(TIPSPERCENTAGE, 10);
    } else {
      tipsPercentage = Session.get(TIPSPERCENTAGE);
      check(tipsPercentage, Number);
    }

    orderTotal.tipsAmount = Number(utilHelpers.roundUp(tipsPercentage * 0.01 * (totalExceptTax - discountAmount), 2));
    orderTotal.finalPriceExceptTips = Number(utilHelpers.roundUp(totalExceptTax * 1.05, 2));
    orderTotal.finalTotalPrice = Number(utilHelpers.roundUp((orderTotal.tipsAmount + (totalExceptTax - discountAmount) + ((totalExceptTax - discountAmount) * TAXRATE)), 2));
    orderTotal.tax = Number(utilHelpers.roundUp((totalExceptTax - discountAmount) * 0.05, 2));
    Session.set(ORDERCHECKOUT, { tipsAmount: orderTotal.tipsAmount, finalTotalPrice: orderTotal.finalTotalPrice, priceBeforeTax: totalExceptTax, priceAfterTax: orderTotal.finalPriceExceptTips, tax: orderTotal.tax });
    return { tipsAmount: orderTotal.tipsAmount, finalTotalPrice: orderTotal.finalTotalPrice };
  }
});

// Sample coupon data Structure 
// discount: 10isActive: truename: "邀请有奖"slug: "invitation"_id: "XxkhJ2DtDJi4igLKL"__proto__: Objectlength: 1__proto__: Array(0)