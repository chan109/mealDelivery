import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { sessionManager, myAppManager } from '../../../utils';

import './riderOrderDetailHeader.html';

Template.riderOrderDetailHeader.helpers({
  headerTitle() {
    if (Session.get(sessionManager.HEADERTITLESESSION) == null) return null;
    return Session.get(sessionManager.HEADERTITLESESSION);
  }
});

Template.riderOrderDetailHeader.events({
  'click .goBack' () {
    Session.set(sessionManager.HEADERTITLESESSION, '');
    FlowRouter.go('/riderChannel');
  }
});