import { Meteor } from 'meteor/meteor';

import Coupons from './models/coupons';

Meteor.publish('coupons.list', function() {
  if (!this.userId) {
    return this.ready();
  }
  return Coupons.find();
});

Meteor.publish('coupons.listById', function(couponId) {
  if (!this.userId) {
    return this.ready();
  }
  return Coupons.find({ _id: couponId });
});
