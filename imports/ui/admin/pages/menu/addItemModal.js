import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import swal from 'sweetalert2';

import './addItemModal.html';

Template.adminAddItemModal.onRendered(() => {
  // clear field on modal closing
  $('#adminAddItemModal').on('hidden.bs.modal', function () {
    $('#dishName').val('');
    $('#dishPrice').val('');
    $('#dishIngredients').val('');
    $('#dishSpicyLevel').val('辣度');
    $('#dishNotes').val('');
  });
});

Template.adminAddItemModal.helpers({
  dish() {
    return Session.get('selectedDish');
  }
});

Template.adminAddItemModal.events({
  'click #addItem'() {
    const dish = {
      name: $('#dishName').val(),
      price: parseFloat($('#dishPrice').val()),
      ingredients: ($('#dishIngredients').val()).split(','),
      spicyLevel: $('#dishSpicyLevel').val(),
      notes: $('#dishNotes').val()
    };
    Meteor.call('Dishes.insert', dish, (err) => {
      if (err) {
        swal('Oops...', err.reason, 'error');
      }
      $('#adminAddItemModal').modal('hide');
    });
  }
});