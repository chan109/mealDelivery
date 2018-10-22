import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Orders = new Mongo.Collection('orders');

Orders.schema = new SimpleSchema({
  orderNumber: { type: Number },
  orderedBy: { type: String, regEx: SimpleSchema.RegEx.Id },
  orderedAt: { type: Date },
  address: { type: Object },
  'address.name': { type: String },
  'address.postCode': { type: String },
  'address.city': { type: String },
  'address.unitNumber': { type: String, optional: true },
  'address.url': { type: String },
  phone: { type: String },
  notes: { type: String, optional: true },
  deliveredAt: { type: Date, optional: true },
  orders: { type: Array },
  'orders.$': { type: Object },
  'orders.$.menu': { type: String, regEx: SimpleSchema.RegEx.Id },
  // 'orders.$.dish': { type: String },
  'orders.$.quantity': { type: Number },
  deliveryFee: { type: Number, min: 0 },
  tax: { type: Number, min: 0 },
  tips: { type: Number, min: 0 },
  // discount: { type: Number, defaultValue: 0, min: 0 },
  discount: { type: Object, optional: true },
  'discount.discount': { type: Number, optional: true },
  'discount.objectId': { type: String, optional: true },
  paidAmount: { type: Number, min: 0 },
  paymentMethod: { type: String, allowedValues: ['wechat', 'card', 'cash'] },
  status: { type: String, allowedValues: ['已下单', '派送中', '已派送', '已取消'], defaultValue: '已下单' },
  isHurry: { type: Boolean },
  rider: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  expectedDate: { type: String }
});

// Orders.attachSchema(Orders.schema);

export default Orders;
