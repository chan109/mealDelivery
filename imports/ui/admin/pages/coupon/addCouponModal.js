import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert2';

import './addCouponModal.html';

Template.adminAddCouponModal.onRendered(() => {
  // clear field on modal closing
  $('#adminAddCouponModal').on('hidden.bs.modal', function () {
    $('#couponName').val('');
    $('#couponDiscount').val('');
    $('#couponCode').val('');
  });
});

Template.adminAddCouponModal.events({
  'click #addCoupon'() {
    const coupon = {
      name: $('#couponName').val(),
      discount: parseFloat($('#couponDiscount').val()),
      code: $('#couponCode').val(),
    };
    Meteor.call('Coupons.insert', coupon, (err) => {
      if (err) {
        swal('Oops...', err.reason, 'error');
      }
      $('#adminAddCouponModal').modal('hide');
    });
  }
});