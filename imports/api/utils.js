import { Meteor } from 'meteor/meteor';

export const requireLogin = (userId) => {
  if (!userId) {
    throw new Meteor.Error('Forbidden', 'pemission denied');
  }
};

export const requireAdmin = (userId) => {
  if (!userId) {
    throw new Meteor.Error('Forbidden', 'pemission denied');
  }

  const user = Meteor.users.findOne({ _id: userId });
  if (user.role !== 'admin') {
    throw new Meteor.Error('Forbidden', 'pemission denied');
  }
};