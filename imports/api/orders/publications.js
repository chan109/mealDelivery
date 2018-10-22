import { Meteor } from 'meteor/meteor';

import Orders from './models/orders';
// import TestCollection from './models/test';

Meteor.publish('orders.list', function() {
  if (!this.userId) {
    return this.ready();
  }
  return Orders.find();
});

Meteor.publish('orders.riderList', function(riderId) {
  if (!this.userId) {
    return this.ready();
  }
  return Orders.find({ rider: riderId });
});

// Meteor.publish('test.list', function() {
//   if (!this.userId) {
//     return this.ready();
//   }
//   return TestCollection.find();
// });

Meteor.publish('orders.listById', function() {
  if (!this.userId) {
    return this.ready();
  }
  const that = this;
  return Orders.find({ orderedBy: that.userId });
});

Meteor.publish('orders.listByCityName', function(city) {
  if (!this.userId) {
    return this.ready();
  }
  return Orders.find({ 'address.city': city.toLowerCase() });
});