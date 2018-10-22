import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './addCouponModal';
import './coupon.html';

import Coupons from '../../../../api/coupon/models/coupons';

Template.adminCoupon.onCreated(() => {
  Meteor.subscribe('coupons.list');
});

Template.adminCoupon.helpers({
  coupons() {
    return Coupons.find();
  }
});

Template.adminCoupon.events({
  'click .toggleCoupon' () {
    Meteor.call('Coupons.toggle', { couponId: this._id, isActive: !!this.isActive }, (err) => {
      if (err) {
        alert(err.reason);
      }
    });
  },
  'click .deleteCoupon' () {
    if (confirm('确定删除优惠券?')) {
      Meteor.call('Coupons.delete', { couponId: this._id }, (err) => {
        if (err) {
          alert(err.reason);
        }
      });
    }
  }
});