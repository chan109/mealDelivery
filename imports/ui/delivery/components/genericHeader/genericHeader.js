import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { sessionManager } from '../../utils';

import './genericHeader.html';

Template.genericHeader.helpers({
  title() {
    return Session.get(sessionManager.HEADERTITLESESSION);
  }
});

Template.genericHeader.events({
  'click .backToPersonalProfile' () {
    FlowRouter.go('/');
    Session.set('page', 'user');
    Session.set(sessionManager.HEADERTITLESESSION, '个人中心');
  }
});