import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';
import { moment } from 'meteor/momentjs:moment';
import './expectedDate.html';
import { utilHelpers, sessionManager, myAppManager, timeSlots } from './../../../utils';

Template.expectedDate.helpers({
  dateObject () {
    const currTime = moment();
    const orderTime = moment(Session.get('ff-item'));
    if (currTime.format('YYYY/MM/DD') === orderTime.format('YYYY/MM/DD')) {
      // return all timeframes after the current time
      const temp1 = timeSlots.map(function(data) {
        return `${orderTime.format('YYYY/MM/DD')} ${data}`;
      });

      const temp2 = temp1.filter(function(data) {
        return currTime.isBefore(moment(data));
      });

      return temp2.map(function(data) {
        return moment(data).format('HH:mm');
      });
    }
    // return all timeframes
    return timeSlots;
  }
});
