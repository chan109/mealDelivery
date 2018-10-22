import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import swal from 'sweetalert2';

import './login.html';

Template.adminLogin.events({
  'click .submit'() {
    $('.form').submit();
  },
  'submit form'(e) {
    e.preventDefault();
    const { phone, password } = e.target;
    Meteor.loginWithPhoneAndPassword({ phone: `+1${phone.value}` }, password.value, (err) => {
      if (err) {
        return swal('Oops...', err.reason, 'error');
      }

      if (Meteor.user().role !== 'admin') {
        swal('Oops...', '需要管理员权限', 'error');
        return Meteor.logout();
      }
      return FlowRouter.go('/admin/dashboard');
    });
  }
});