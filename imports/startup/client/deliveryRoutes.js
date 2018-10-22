import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import '../../ui/delivery/components/tabbar/tabbar';
import '../../ui/delivery/components/header/header';

import '../../ui/delivery/pages/rider/riderOrderList/riderOrderListHeader';

import '../../ui/delivery/layouts/layout';
import '../../ui/delivery/pages/main';
import '../../ui/delivery/pages/account/login';
import '../../ui/delivery/pages/account/signup';

import '../../ui/delivery/pages/main/order/order';
import '../../ui/delivery/pages/main/updateLocation/updateLocation';
import '../../ui/delivery/pages/main/orderDetail/orderDetail';
import '../../ui/delivery/pages/main/user/about/about';
import '../../ui/delivery/pages/main/user/invite/invite';
import '../../ui/delivery/pages/main/user/coupon/coupon';

import '../../ui/delivery/pages/rider/riderSignUp/riderSignUp';
import '../../ui/delivery/pages/rider/riderOrderList/riderOrderList';

import '../../ui/delivery/pages/rider/riderOrderDetail/riderOrderDetail';
import '../../ui/delivery/pages/rider/riderOrderDetail/riderOrderDetailHeader';

import { sessionManager } from '../../ui/delivery/utils';

BlazeLayout.setRoot('body');

// private routes require user login
const privateRoutes = FlowRouter.group({
  triggersEnter: [() => {
    if (!Meteor.userId()) {
      FlowRouter.go('/login');
    }
  }]
});

privateRoutes.route('/', {
  name: 'delivery.main',
  action() {
    BlazeLayout.render('mainLayout', { top: 'header', main: 'main', bottom: 'tabbar' });
  }
});

FlowRouter.route('/login', {
  name: 'delivery.login',
  action() {
    // BlazeLayout.render('mainLayout', { top: 'header', main: 'login' });
    Session.set(sessionManager.HEADERTITLESESSION, '登陆界面');
    Session.set('page', 'login');
    BlazeLayout.render('mainLayout', { top: 'header', main: 'login' });
  }
});

FlowRouter.route('/signup', {
  name: 'delivery.login',
  action() {
    BlazeLayout.render('mainLayout', { top: 'header', main: 'signup' });
  }
});

FlowRouter.route('/order', {
  name: 'delevery.order',
  action() {
    BlazeLayout.render('mainLayout', { top: 'header', main: 'order' });
  }
});

FlowRouter.route('/updateLocation', {
  name: 'delivery.updateLocation',
  action() {
    BlazeLayout.render('mainLayout', { top: 'header', main: 'updateLocation' });
  }
});

FlowRouter.route('/orderDetail', {
  name: 'delivery.orderDetail',
  action() {
    BlazeLayout.render('mainLayout', { top: 'header', main: 'orderDetailTwo' });
  }
});

FlowRouter.route('/about', {
  name: 'delivery.about',
  action() {
    BlazeLayout.render('mainLayout', { top: 'header', main: 'about' });
  }
});

FlowRouter.route('/invite/:id', {
  name: 'delivery.invite',
  action(params) {
    Meteor.subscribe('user.listById', params.id, function() {
      if (Meteor.users.find({ _id: params.id }).count() !== 1) {
        alert('邀请链接不正确');
        Session.set(sessionManager.SHARESESSION, null);
        return null;
      }
      Session.set(sessionManager.SHARESESSION, params.id);
      BlazeLayout.render('mainLayout', { top: 'header', main: 'invite' });
    });

    // Session.set(sessionManager.INVITEHELPER, queryParams.showInvitePage);
  }
});

FlowRouter.route('/coupon', {
  name: 'delivery.coupon',
  action() {
    BlazeLayout.render('mainLayout', { top: 'header', main: 'coupon' });
  }
});

privateRoutes.route('/riderSignUp', {
  name: 'delivery.riderChannel',
  action() {
    Session.set(sessionManager.HEADERTITLESESSION, '快速入职通道');
    Session.set('page', 'riderSignUp');
    BlazeLayout.render('mainLayout', { top: 'header', main: 'riderSignUp' });
  }
});

function IsRider(userId) {
  return true;
}

const privateRoutesForRider = FlowRouter.group({
  triggersEnter: [() => {
    if (!Meteor.userId()) {
      FlowRouter.go('/login');
    }

    if (!IsRider(Meteor.userId)) {
      FlowRouter.go('/login');
    }
  }]
});

privateRoutesForRider.route('/riderChannel', {
  name: 'delivery.riderChannel',
  action() {
    Session.set('page', 'riderHome');
    BlazeLayout.render('mainLayout', { top: 'riderOrderHeader', main: 'riderOrderList' });
  }
});

privateRoutesForRider.route('/riderChannel/detail', {
  name: 'delivery.riderOrderDetail',
  action() {
    Session.set('page', 'riderOrderDetail');
    BlazeLayout.render('mainLayout', { top: 'riderOrderDetailHeader', main: 'riderOrderDetail' });
  }
});

// FlowRouter.route('/orderList', {
//   name: 'delivery.orderList',
//   action() {
//     Session.set('page', 'order');
//     BlazeLayout.render('mainLayout', { top: 'header', main: 'order', bottom: 'tabbar' });
//   }
// });

