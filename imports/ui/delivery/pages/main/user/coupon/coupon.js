import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/erasaur:meteor-lodash';

import './coupon.html';
import Coupons from '../../../../../../api/coupon/models/coupons';

Template.coupon.onCreated(function() {
  Meteor.subscribe('coupons.list');
});

Template.coupon.helpers({
  hasCoupon() {
    return Meteor.user().coupons && Meteor.user().coupons.length > 0;
  },
  coupons() {
    return _.orderBy(Meteor.user().coupons, 'isUsed', 'asc');
  },
  couponData() {
    return Coupons.findOne(this.couponId);
  }
});