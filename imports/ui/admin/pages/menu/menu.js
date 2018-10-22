import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import swal from 'sweetalert2';

import Dishes from '../../../../api/menu/models/dishes';

import './addItemModal';
import './editItemModal';
import './menu.html';

Template.adminMenu.onCreated(() => {
  Meteor.subscribe('dishes.list');
});

Template.adminMenu.helpers({
  dishList() {
    return Dishes.find().fetch();
  }
});

Template.adminMenu.events({
  'click .dishImage'() {
    uploadcare.openDialog(null, {
      previewStep: true,
      crop: true,
    }).done((file) => {
      file.promise().done((fileInfo) => {
        const body = {
          imageUrl: fileInfo.originalUrl,
          dishId: this._id
        };
        Meteor.call('Dishes.update.image', body, (err) => {
          if (err) {
            swal('Oops...', err.reason, 'error');
          }
        });
      });
    });
  },
  'click .editDishItem'() {
    Session.set('selectedDish', this);
    $('#adminEditItemModal').modal('show');
  }
});