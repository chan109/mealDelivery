import { Meteor } from 'meteor/meteor';

import Dishes from './models/dishes';
import Menus from './models/menus';

Meteor.publish('dishes.list', function() {
  if (!this.userId) {
    return this.ready();
  }
  return Dishes.find();
});

Meteor.publish('menus.list', function() {
  if (!this.userId) {
    return this.ready();
  }

  return Menus.find();
});