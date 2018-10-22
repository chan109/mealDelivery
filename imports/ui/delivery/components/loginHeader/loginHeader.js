import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './loginHeader.html';

Template.loginHeader.helpers({
  title() {
    if (Session.get('page') === 'login') {
      return '登录页面';
    }
    return '注册页面';
  }
});
