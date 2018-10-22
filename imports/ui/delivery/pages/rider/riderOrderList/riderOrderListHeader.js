import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { sessionManager } from '../../../utils';
import Orders from '../../../../../api/orders/models/orders';

import './riderOrderListHeader.html';

Template.riderOrderHeader.onCreated(function() {
  Session.set(sessionManager.QUERY, { status: '派送中' });
  Session.set(sessionManager.ISFINISHED, false);
});

Template.riderOrderHeader.helpers({
  newOrderAmount() {
    if (Session.get(sessionManager.OREDERSCOUNT) == null) {
      return 1;
    }
    return Session.get(sessionManager.OREDERSCOUNT).paid;
  },
  processingOrderAmount() {
    if (Session.get(sessionManager.OREDERSCOUNT) == null) {
      return 1;
    }
    return Session.get(sessionManager.OREDERSCOUNT).hurry;
  },
  completedOderAmount() {
    if (Session.get(sessionManager.OREDERSCOUNT) == null) {
      return 1;
    }
    return Session.get(sessionManager.OREDERSCOUNT).delivered;
  }
});

Template.riderOrderHeader.events({
  'click .goBack'() {
    FlowRouter.go('/');
    Session.set('page', 'user');
    Session.set(sessionManager.HEADERTITLESESSION, '个人中心');
  },
  'click .new-order'(e) {
    const query = { status: '派送中' };
    $('.riderOrderHeader li').removeClass('selectedRiderOrder');
    $(e.currentTarget).addClass('selectedRiderOrder');
    Session.set(sessionManager.QUERY, query);
    Session.set(sessionManager.ISFINISHED, false);
  },
  // 'click .processing-order'(e) {
  //   // TODO: not sure what the 催单 is
  //   const query = { isHurry: true };
  //   $('.riderOrderHeader li').removeClass('selectedRiderOrder');
  //   $(e.currentTarget).addClass('selectedRiderOrder');
  //   Session.set(sessionManager.QUERY, query);
  // },
  'click .completed-order'(e) {
    const query = { status: '已派送' };
    $('.riderOrderHeader li').removeClass('selectedRiderOrder');
    $(e.currentTarget).addClass('selectedRiderOrder');
    Session.set(sessionManager.QUERY, query);
    Session.set(sessionManager.ISFINISHED, true);
  }
});
