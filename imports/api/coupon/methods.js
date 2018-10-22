import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { requireAdmin } from '../utils';
import Coupons from '../coupon/models/coupons';

export const insertCoupon = new ValidatedMethod({
  name: 'Coupons.insert',
  validate: new SimpleSchema({
    name: String,
    discount: Number,
    code: String
  }).validator(),
  run(data) {
    requireAdmin(this.userId);
    Coupons.insert(data);
  },
});

export const toggleCoupon = new ValidatedMethod({
  name: 'Coupons.toggle',
  validate: new SimpleSchema({
    couponId: { type: String, regEx: SimpleSchema.RegEx.Id },
    isActive: Boolean
  }).validator(),
  run({ couponId, isActive }) {
    requireAdmin(this.userId);
    Coupons.update({ _id: couponId }, { $set: { isActive: !isActive } });
  },
});

export const deleteCoupon = new ValidatedMethod({
  name: 'Coupons.delete',
  validate: new SimpleSchema({
    couponId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ couponId }) {
    requireAdmin(this.userId);
    Coupons.remove(couponId);
  },
});