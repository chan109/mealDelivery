import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Menus = new Mongo.Collection('menus');

Menus.schema = new SimpleSchema({
  dishId: { type: String, regEx: SimpleSchema.RegEx.Id },
  serveFrom: Date,
  serveTo: Date,
  area: String,
  stock: { type: Number, min: 0, optional: true },
  isLimited: { type: Boolean, defaultValue: false },
  createdAt: { type: Date },
  updatedAt: { type: Date, optional: true }
});

Menus.attachSchema(Menus.schema);

export default Menus;

