import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './orderHeader.html';

const HEADERTITLESESSION = 'headerTitle';
Template.orderHeader.helpers({
  headerTitle() {
    if (Session.get(HEADERTITLESESSION == null)) {
      return 4;
    }
    return Session.get(HEADERTITLESESSION);
  }
});

Template.orderHeader.events({
  'click .goBack'() {
    Session.set(HEADERTITLESESSION, '');
    FlowRouter.go('/');
    Session.set('page', 'home');
    $('.tab-link').removeClass('tab-link-active');
    $("a[page|='home']").addClass('tab-link-active');
  }
});

