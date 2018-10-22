import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import swal from 'sweetalert2';
import './login.html';


const HEADERTITLESESSION = 'headerTitle';

Template.login.events({
  'submit form'(e) {
    e.preventDefault();
    const { phone, password, countryCode } = e.target;
    Meteor.loginWithPhoneAndPassword({ phone: `${countryCode.value}${phone.value}` }, password.value, (err) => {
      if (err) {
        return swal('Oops...', err.reason, 'error');
      }
      Session.set(HEADERTITLESESSION, '');
      return FlowRouter.go('/');
    });
  },
  'click #signup-id' () {
    Session.set('page', 'signup');
    return FlowRouter.go('/signup');
  }
});