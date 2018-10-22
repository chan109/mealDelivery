import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import '../orderHeader/orderHeader';
import '../orderDetailHeader/orderDetailHeader';
import '../homeHeader/homeHeader';
import '../loginHeader/loginHeader';
import '../genericHeader/genericHeader';
import './header.html';

const HEADERTITLESESSION = 'headerTitle';
Template.header.helpers({
  headerTitle() {
    if (Session.get(HEADERTITLESESSION == null)) {
      return 4;
    }
    return Session.get(HEADERTITLESESSION);
  },
  showHomeHeader() {
    return Session.get('page') === 'home';
  },
  showOrderDetailHeader() {
    return Session.get('page') === 'orderDetail';
  },
  showOrderHeader() {
    return Session.get('page') === 'order';
  },
  showConfirmOrderHeader() {
    return Session.get('page' === 'confirmOrder');
  },
  showUserHeader() {
    return Session.get('page') === 'user';
  },
  showLoginHeader() {
    return Session.get('page') === 'login';
  },
  showSignupHeader() {
    return Session.get('page') === 'signup';
  },
  showRiderHeader() {
    return Session.get('page') === 'riderSignUp';
  }
});
