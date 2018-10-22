import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './orderDetailHeader.html';

const HEADERTITLESESSION = 'headerTitle';
Template.orderDetailHeader.helpers({
  headerTitle() {
    if (Session.get(HEADERTITLESESSION == null)) {
      return 4;
    }
    return Session.get(HEADERTITLESESSION);
  }
});

Template.orderDetailHeader.events({
  'click .goBack'() {
    Session.set(HEADERTITLESESSION, '订单列表');
    FlowRouter.go('/');
    $('.tab-link').removeClass('tab-link-active');
    $("a[page|='home']").addClass('tab-link-active');
  }
});

