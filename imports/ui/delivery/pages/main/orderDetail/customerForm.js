import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { moment } from 'meteor/momentjs:moment';
import './customerForm.html';

Template.customerForm.onCreated(function() {
  Meteor.subscribe('user.list');
});

Template.customerForm.helpers({
  orderedDate() {
    return moment(this.orderedAt).format('YYYY/MM/DD hh:mm a');
  },
  unitNumber() {
    if (this.address.unitNumber != null && this.address.unitNumber !== '') {
      return { uNum: this.address.unitNumber };
    }
    return false;
  }
});