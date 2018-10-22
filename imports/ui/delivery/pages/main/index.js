import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './index.html';
import './home/home';
import './orderList/orderList';
import './user/user';

Template.main.onCreated(function () {
  const DEFAULT_PAGE = 'home';

  // For development purposes
  // const DEFAULT_PAGE = 'order';

  Session.set('page', DEFAULT_PAGE);
});

Template.main.helpers({
  showHome() {
    return Session.get('page') === 'home';
  },
  showOrder() {
    return Session.get('page') === 'order';
  },
  showUser() {
    return Session.get('page') === 'user';
  }
});