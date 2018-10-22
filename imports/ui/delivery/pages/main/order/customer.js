import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { moment } from 'meteor/momentjs:moment';
import { Session } from 'meteor/session';

import './customer.html';

const LOCATIONSESSION = 'geoLocation';

Template.customer.helpers({
  customerInfo() {
    return {
      phoneNum: Meteor.user().phone.number,
      time: moment(Session.get('ff-item')).format('YYYY/MM/DD hh:mm a'),
      address: Session.get(LOCATIONSESSION)
    };
  },
  unitNumber() {
    const address = Session.get(LOCATIONSESSION);
    if (address.unitNumber !== null && address.unitNumber !== '') {
      return { uNum: address.unitNumber };
    }
    return false;
  }
});