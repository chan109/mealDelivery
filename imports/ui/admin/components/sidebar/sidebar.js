import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './sidebar.html';

Template.adminSidebar.events({
  'click #logoutBtn'() {
    Meteor.logout();
    FlowRouter.go('/admin/login');
  },
  'click #menu' () {
    FlowRouter.go('/admin/menu');
  },
  'click #dashboard' () {
    FlowRouter.go('/admin/dashboard');
  },
  'click #user' () {
    FlowRouter.go('/admin/user');
  },
  'click #calendar' () {
    FlowRouter.go('/admin/calendar');
  },
  'click #order' () {
    FlowRouter.go('/admin/order');
  },
  'click #coupon' () {
    FlowRouter.go('/admin/coupon');
  },
});