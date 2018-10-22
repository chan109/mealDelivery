import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Coupons = new Mongo.Collection('coupons');

Coupons.schema = new SimpleSchema({
  name: String,
  slug: { type: String, optional: true },
  discount: Number,
  code: { type: String, optional: true },
  isActive: { type: Boolean, defaultValue: true }
});

Coupons.attachSchema(Coupons.schema);

export default Coupons;

