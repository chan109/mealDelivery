import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/erasaur:meteor-lodash';
// import { requireAdmin } from '../utils';
import Orders from './models/orders';
import Menus from '../menu/models/menus';
// import Coupons from '../coupon/models/coupons';
// import { check } from 'meteor/check';

function IsIdExits(id) {
  const result = Orders.findOne({ orderNumber: id });
  if (result == null) {
    return false;
  }

  return true;
}

export const insertOrders = new ValidatedMethod({
  name: 'Orders.insert',
  validate: new SimpleSchema({
    orderedAt: { type: Date },
    address: { type: Object },
    'address.name': { type: String },
    'address.postCode': { type: String },
    'address.city': { type: String },
    'address.unitNumber': { type: String, optional: true },
    'address.url': { type: String, optional: true },
    phone: String,
    notes: { type: String, optional: true },
    orders: { type: Array },
    'orders.$': { type: Object },
    'orders.$.menu': { type: String, regEx: SimpleSchema.RegEx.Id },
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
    expectedDate: { type: String }
  }).validator(),
  run({ orderedAt, orders, phone, address, notes, deliveryFee, tax, tips, discount, paidAmount, paymentMethod, status, isHurry, expectedDate }) {
    let helperFlag = true;
    let tryRandomId = 0;

    // Need to be refactored
    while (helperFlag) {
      tryRandomId = _.random(10000000, 99999999);
      if (!IsIdExits(tryRandomId)) {
        helperFlag = false;
      }
    }

    Orders.insert({
      orders,
      address,
      notes,
      deliveryFee,
      phone,
      tax,
      tips,
      discount,
      paidAmount,
      paymentMethod,
      status,
      orderNumber: tryRandomId,
      orderedAt,
      orderedBy: this.userId,
      isHurry,
      expectedDate
    }, function() {
      const temp = Meteor.users.findOne({ _id: Meteor.userId() });
      const newCouponsObj = temp.coupons.map(function(data) {
        if (data.id === discount.objectId) {
          data.isUsed = true;
        }
        return data;
      });

      console.log(temp);
      console.log(newCouponsObj);

      if (temp !== newCouponsObj) {
        Meteor.users.update(
          {
            _id: Meteor.userId() },
          { $set: { coupons: newCouponsObj } }
        );
      }
    });
  },
});

export const cancelOrder = new ValidatedMethod({
  name: 'Orders.cancel',
  validate: new SimpleSchema({
    orderId: { type: String, regEx: SimpleSchema.RegEx.Id }
  }).validator(),
  run({ orderId }) {
    Orders.update({
      _id: orderId
    }, {
      $set: {
        status: '已取消',
      }
    });
  },
});

// TODO: Need to be worked on
export const completeOrder = new ValidatedMethod({
  name: 'Orders.complete',
  validate: new SimpleSchema({
    orderId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ orderId }) {
    Orders.update({
      _id: orderId
    }, {
      $set: {
        status: '已派送',
        deliveredAt: new Date()
      }
    });
    const order = Orders.findOne(orderId);

    order.orders.forEach((o) => {
      Menus.update({
        _id: o.menu
      }, {
        $inc: { stock: -o.quantity }
      });
    });
  },
});

export const assignOrder = new ValidatedMethod({
  name: 'Orders.assign',
  validate: new SimpleSchema({
    riderId: { type: String, regEx: SimpleSchema.RegEx.Id },
    orderIds: { type: Array },
    'orderIds.$': { type: String }
  }).validator(),
  run({ riderId, orderIds }) {
    Orders.update({
      _id: { $in: orderIds }
    }, {
      $set: {
        rider: riderId,
        status: '派送中'
      }
    }, {
      multi: true
    });
  },
});

