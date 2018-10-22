import { Meteor } from 'meteor/meteor';

import Dishes from './models/dishes';

Meteor.publish('dishes.list', function() {
  if (!this.userId) {
    return this.ready();
  }
  // console.log(Dishes.find().fetch());
  return Dishes.find();
});