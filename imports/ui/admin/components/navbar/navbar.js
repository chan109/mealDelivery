import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './navbar.html';

Template.adminNavbar.helpers({
  navbarTitle() {
    return Session.get('navbarTitle');
  }
});