import { Template } from 'meteor/templating';
import './allOrders/allOrders';
import './allRiders/allRiders';
import './calendar/calendar';
import './order.html';

Template.adminOrder.onRendered(() => {
  setTimeout(function() {
    $('#regionOrdersTable').DataTable();
    $('#regionRidersTable').DataTable();
  }, 500);
});