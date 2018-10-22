import { Meteor } from 'meteor/meteor';

// current user data
Meteor.publish('user.data', function() {
  if (!this.userId) {
    return this.ready();
  }
  return Meteor.users.find(
    { _id: this.userId },
    {
      fields: { name: 1, phone: 1, email: 1, role: 1, becomingRider: 1, isBlocked: 1, invitationCode: 1, coupons: 1, address: 1 }
    }
  );
});

Meteor.publish('user.list', function() {
  if (!this.userId) {
    return this.ready();
  }

  return Meteor.users.find(
    {},
    {
      fields: { name: 1, phone: 1, email: 1, role: 1, becomingRider: 1, city: 1, isBlocked: 1 }
    }
  );
});

Meteor.publish('user.listById', function(targetId) {

  return Meteor.users.find(
    { _id: targetId },
    {
      fields: { name: 1, phone: 1, email: 1, role: 1, becomingRider: 1, city: 1, isBlocked: 1 }
    }
  );
});

Meteor.publish('user.listByCityName', function(city) {
  if (!this.userId) {
    return this.ready();
  }

  return Meteor.users.find(
    { city, role: 'rider' },
    {
      fields: { name: 1, phone: 1, email: 1, role: 1, becomingRider: 1, city: 1, isBlocked: 1 }
    }
  );
});