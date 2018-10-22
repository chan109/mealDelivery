import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

import { sessionManager, myAppManager } from '../../../utils';

import './riderSignUp.html';


Template.riderSignUp.events({
  'click button' () {
    // send something to the admin
    myAppManager.dialog.alert('申请请求已成功提交', '通知', function() {
      FlowRouter.go('/');
      Meteor.call('User.statusUpdate', {});
      Session.set('page', 'user');
      Session.set(sessionManager.HEADERTITLESESSION, '个人中心');
    });
  }
});
