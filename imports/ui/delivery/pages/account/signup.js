import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { $ } from 'meteor/jquery';
import { Accounts } from 'meteor/accounts-base';
import swal from 'sweetalert2';
import { Session } from 'meteor/session';
import { sessionManager } from '../../utils';
import './signup.html';

Template.signup.helpers({
  showShare() {
    return Session.get(sessionManager.SHARESESSION) != null;
  }
});

Template.signup.events({
  'click #f-test' () {
    console.log(123);
    window.location.href = 'login';
  },
  'click #sendVerificationCodeBtn'() {
    const countryCode = $('[name=countryCode]').val();
    const phone = $('[name=phone]').val();
    Accounts.requestPhoneVerification(`${countryCode}${phone}`, () => {
      swal('验证码已发送', '请填写您收到的验证码', 'success');
    });
  },
  'submit form'(e) {
    e.preventDefault();
    const { countryCode, phone, verificationCode, password, invitationCode } = e.target;
    Accounts.verifyPhone(`${countryCode.value}${phone.value}`, verificationCode.value, password.value, (err) => {
      if (err) {
        return swal('Oops...', err.reason, 'error');
      }

      // if (invitationCode.value) {
      //   Meteor.call('User.invitation', { invitationCode: invitationCode.value }, () => {
      //     return FlowRouter.go('/');
      //   });
      // }

      const anotherUser = Session.get(sessionManager.SHARESESSION);
      if (anotherUser != null && anotherUser !== '') {
        // assign a discount ticket to that user and itself
        Meteor.call('User.invitation', { userId: anotherUser });
        Meteor.call('User.invitation', { userId: Meteor.userId() });
        alert('注册成功并获取优惠卷一张');
      }
      return FlowRouter.go('/');
    });
  }
});