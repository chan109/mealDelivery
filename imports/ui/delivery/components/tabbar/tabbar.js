import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { $ } from 'meteor/jquery';
import './tabbar.html';

const HEADERTITLESESSION = 'headerTitle';
Template.tabbar.events({
  'click .tab-link'(e) {
    $('.tab-link').removeClass('tab-link-active');
    $(e.currentTarget).addClass('tab-link-active');
    Session.set('page', $(e.currentTarget).attr('page'));

    if ($(e.currentTarget).attr('page') === 'order') {
      Session.set(HEADERTITLESESSION, '订单列表');
    } else if ($(e.currentTarget).attr('page') === 'home') {
      Session.set(HEADERTITLESESSION, '');
    } else if ($(e.currentTarget).attr('page') === 'user') {
      Session.set(HEADERTITLESESSION, '个人中心');
    }
  }
});
