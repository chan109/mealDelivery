import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { sessionManager } from '../../../../utils';
import './invite.html';

// Template.invite.onRendered(function() {
//   new ClipboardJS('.clipboard');
// });

Template.invite.onCreated(function() {
  if (Meteor.userId() == null) {
    Session.set('page', 'signup');
    FlowRouter.go('/signup');
  }
});


// Template.invite.helpers({
//   invitationCode() {
//     return Meteor.user() && Meteor.user().invitationCode;
//   }
// });