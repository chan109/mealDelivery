import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Dishes = new Mongo.Collection('dishes');

Dishes.schema = new SimpleSchema({
  name: { type: String },
  price: { type: Number, min: 0 },
  ingredients: { type: Array },
  'ingredients.$': { type: String },
  spicyLevel: { type: String },
  notes: { type: String, optional: true },
  imageUrl: { type: String, defaultValue: '/img/default-dish.jpg' },
  createdBy: { type: String, regEx: SimpleSchema.RegEx.Id },
  createdAt: { type: Date },
  updatedAt: { type: Date, optional: true }
});

Dishes.attachSchema(Dishes.schema);

export default Dishes;

