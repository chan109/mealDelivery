import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import swal from 'sweetalert2';

import './editItemModal.html';

Template.adminEditItemModal.helpers({
  dish() {
    return Session.get('selectedDish');
  },
  spicyLevel(spicyLevel) {
    return Session.get('selectedDish').spicyLevel === spicyLevel;
  }
});

Template.adminEditItemModal.events({
  'click #editItem'() {
    const dish = {
      dishId: Session.get('selectedDish')._id,
      name: $('#editDishName').val(),
      price: parseFloat($('#editDishPrice').val()),
      ingredients: ($('#editDishIngredients').val()).split(','),
      spicyLevel: $('#editDishSpicyLevel').val(),
      notes: $('#editDishNotes').val()
    };
    Meteor.call('Dishes.update', dish, (err) => {
      if (err) {
        swal('Oops...', err.reason, 'error');
      }
      $('#adminEditItemModal').modal('hide');
    });
  }
});