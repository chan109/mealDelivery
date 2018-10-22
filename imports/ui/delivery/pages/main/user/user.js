import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import './user.html';
import { sessionManager } from '../../../utils';

Template.user.helpers({
  riderStatus() {
    if (Meteor.user().role === 'rider') {
      Session.set('whoami', '送餐员端口');
      return 'verified-rider';
    } else if (Meteor.user().becomingRider) {
      Session.set('whoami', '等待审核');
      // return 'verify-rider';
      return null;
    } else if (
      Meteor.user().role === 'customer' ||
      Meteor.user().role === 'admin'
    ) {
      Session.set('whoami', '成为送餐员');
      return 'become-rider';
    }
    return null;
  },
  riderInfo() {
    return Session.get('whoami');
  }
});

Template.user.events({
  'click #logoutBtn'() {
    Meteor.logout();
    FlowRouter.go('/login');
  },
  'click .become-rider'() {
    FlowRouter.go('/riderSignUp');
  },
  'click .verify-rider'() {
    FlowRouter.go('/riderSignUp');
  },
  'click .verified-rider'() {
    FlowRouter.go('/riderChannel');
  },
  'click .coupon'() {
    // may need to set the header here
    Session.set(sessionManager.HEADERTITLESESSION, '优惠券');
    FlowRouter.go('/coupon');
  },
  'click .invite'() {
    // may need to set the header here
    // FlowRouter.go(`/invite/${Meteor.userId()}`);
    // window.location.replace(`invite/${Meteor.userId()}`);
    window.open(`invite/${Meteor.userId()}`);

    // window.location.replace = 'signup';

    // Session.set(sessionManager.HEADERTITLESESSION, '邀请好友 各赢红包');
  },
  'click .about'() {
    // may need to set the header here
    Session.set(sessionManager.HEADERTITLESESSION, '关于我们');
    FlowRouter.go('/about');
  }
});
