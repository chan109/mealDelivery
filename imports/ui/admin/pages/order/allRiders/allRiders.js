import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import './allRiders.html';
import { sessionManager } from '../../../../delivery/utils';

Template.adminAllRider.onCreated(function() {
  Meteor.subscribe('user.listByCityName', Session.get(sessionManager.SELECTCITY));
});

Template.adminAllRider.helpers({
  users() {
    const dataToReturn = Meteor.users.find({ role: 'rider', city: Session.get(sessionManager.SELECTCITY) }).fetch();
    return dataToReturn;
  }
});