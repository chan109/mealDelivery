import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';
import swal from 'sweetalert2';
import { Meteor } from 'meteor/meteor';

import './calendar.html';
import Dishes from '../../../../../api/menu/models/dishes';
import Menus from '../../../../../api/menu/models/menus';

Template.adminCalendar.onCreated(() => {
  Meteor.subscribe('dishes.list');
  Meteor.subscribe('menus.list');
});

Template.adminCalendar.onRendered(() => {
  $('.datetimepicker').datetimepicker({
    icons: {
      time: 'fa fa-clock-o',
      date: 'fa fa-calendar',
      up: 'fa fa-chevron-up',
      down: 'fa fa-chevron-down',
      previous: 'fa fa-chevron-left',
      next: 'fa fa-chevron-right',
      today: 'fa fa-screenshot',
      clear: 'fa fa-trash',
      close: 'fa fa-remove'
    }
  });

  const initCalendar = () => {
    const area = location.pathname.split('/').pop();
    const menus = Menus.find({ area }).fetch();
    const dishes = Dishes.find().fetch();

    const menuEvents = menus.map(m => ({
      id: m._id,
      title: `${dishes.find(d => d._id === m.dishId).name}(${m.stock})`,
      start: m.serveFrom,
      end: m.serveTo
    }));

    const calendar = $('#real-calendar');
    calendar.fullCalendar({
      header: {
        left: 'prev,next,today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultView: 'agendaWeek',
      defaultDate: moment().format(),
      nowIndicator: true,
      selectable: true,
      navLinks: true,
      businessHours: {
        dow: [1, 2, 3, 4, 5], // Monday - Thursday
        start: '10:00', // a start time (10am in this example)
        end: '24:00', // an end time (6pm in this example)
      },
      timezone: 'local',
      selectHelper: true,
      select: async (start, end) => {
        const inputOptions = dishes.map(d => d.name);

        const { value } = await swal.mixin({
          confirmButtonText: 'Next',
          showCancelButton: true,
          confirmButtonClass: 'btn btn-success',
          cancelButtonClass: 'btn btn-danger',
          buttonsStyling: false,
          progressSteps: ['1', '2']
        }).queue([
          {
            title: '选择菜品',
            input: 'select',
            inputOptions,
            inputPlaceholder: '选择菜品',
          }, {
            title: '库存',
            input: 'text',
          }
        ]);
        let eventData;
        if (value) {
          const selectedDish = dishes[value[0]];
          const data = {
            dishId: selectedDish._id,
            stock: parseInt(value[1], 10),
            serveFrom: start.format(),
            serveTo: end.format(),
            area
          };
          Meteor.call('Menus.insert', data, (err, menuId) => {
            if (err) {
              swal('Oops...', err.reason, 'error');
            } else {
              eventData = {
                id: menuId,
                title: `${selectedDish.name}(${value[1]})`,
                start,
                end
              };
              calendar.fullCalendar('renderEvent', eventData, true);
            }
          });
        }
        calendar.fullCalendar('unselect');
      },
      editable: true,
      eventLimit: true,
      events: menuEvents,
      eventResize(event, delta, revertFunc) {
        const data = {
          menuId: event.id,
          serveFrom: event.start.format(),
          serveTo: event.end.format(),
        };
        Meteor.call('Menus.update', data, (err) => {
          if (err) {
            revertFunc();
          }
        });
      },
      eventDrop(event, delta, revertFunc) {
        const data = {
          menuId: event.id,
          serveFrom: event.start.format(),
          serveTo: event.end.format(),
        };
        Meteor.call('Menus.update', data, (err) => {
          if (err) {
            revertFunc();
          }
        });
      },
      eventClick: async (event) => {
        const { value } = await swal({
          title: '确认删除菜品 ?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          reverseButtons: true,
          allowOutsideClick: false
        });
        if (value) {
          Meteor.call('Menus.delete', { menuId: event.id }, (err) => {
            if (err) {
              swal('Oops...', err.reason, 'error');
            } else {
              calendar.fullCalendar('removeEvents', [event.id]);
            }
          });
        }
      },
    });
  };
  setTimeout(function() {
    initCalendar();
  }, 1000);
});

Template.adminCalendar.helpers({
  dishes() {
    return Dishes.find().fetch();
  }
});

Template.adminCalendar.events({
  'click #addMenuItemBtn'() {
    const dishId = $('#menuItemSelect').val();
    const serveFrom = moment($('#menuItemServeFrom').val());
    const serveTo = moment($('#menuItemServeTo').val());
    const stock = parseInt($('#menuItemStock').val(), 10);
    const area = location.pathname.split('/').pop();

    const dishName = $('#menuItemSelect').find(':selected').text();
    const data = {
      dishId,
      stock,
      serveFrom: serveFrom.format(),
      serveTo: serveTo.format(),
      area
    };

    const calendar = $('#real-calendar');
    Meteor.call('Menus.insert', data, (err, menuId) => {
      if (err) {
        swal('Oops...', err.reason, 'error');
      } else {
        const eventData = {
          id: menuId,
          title: dishName,
          start: serveFrom,
          end: serveTo
        };
        calendar.fullCalendar('renderEvent', eventData, true);
        $('#menuItemSelect').val('');
        $('#menuItemServeFrom').val('');
        $('#menuItemServeEnd').val('');
        $('#menuItemStock').val('');
      }
    });
  }
});
