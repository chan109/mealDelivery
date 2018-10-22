import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';
import { Session } from 'meteor/session';
import './timeNavBar.html';
import { myAppManager, sessionManager } from '../../../utils';

Template.timeNavbar.helpers({
  selectedDate() {
    const targetTime = Session.get('ff-item');
    if (targetTime == null) {
      Session.set('ff-item', moment().format());

      return moment(Session.get('ff-item')).format('YYYY/MM/DD');
    }
    return moment(targetTime).format('YYYY/MM/DD');
  }
});

Template.timeNavbar.events({
  'click .right-arrow'() {
    const dialogPromise = new Promise((resolve, reject) => {
      if (Session.get(sessionManager.SELECTEDORDER) == null || Session.get(sessionManager.SELECTEDORDER).length === 0) {
        resolve('Selectered session is empty');
        return null;
      }
      myAppManager.dialog.confirm('切换日期将会移除所有已选订单', '提示', function() {
        Session.set(sessionManager.SELECTEDORDER, null);
        resolve('confirmed to remove all selected orders');
      }, function() {
        reject('cancel the operations');
      });
    });
    dialogPromise.then((successfulMsg) => {
      console.log(successfulMsg);
      const newDate = moment(Session.get('ff-item')).add(1, 'days');
      if (newDate.isAfter(moment().add(7, 'days'))) {
        return null;
      }
      Session.set('ff-item', newDate.format());
      return null;
    }).catch((failMsg) => {
      console.log(failMsg);
    });
  },
  'click .left-arrow'() {
    const dialogPromise = new Promise((resolve, reject) => {
      if (Session.get(sessionManager.SELECTEDORDER) == null || Session.get(sessionManager.SELECTEDORDER).length === 0) {
        resolve('Selectered session is empty');
        return null;
      }
      myAppManager.dialog.confirm('切换日期将会移除所有已选订单', '提示', function() {
        Session.set(sessionManager.SELECTEDORDER, null);
        resolve('confirmed to remove all selected orders');
      }, function() {
        reject('cancel the operations');
      });
    });
    dialogPromise.then((successfulMsg) => {
      console.log(successfulMsg);
      const oldDate = Session.get('ff-item');
      const newDate = moment(moment(oldDate).add(-1, 'days').format('YYYY-MM-DD'));
      if (newDate.isBefore(moment(moment().format('YYYY-MM-DD')))) {
        return null;
      }
      Session.set('ff-item', newDate.format());
      return null;
    }).catch((failMsg) => {
      console.log(failMsg);
    });
  }
});

