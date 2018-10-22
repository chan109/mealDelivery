import { Template } from 'meteor/templating';
import './loginLayout.html';

Template.adminLoginLayout.onCreated(() => {
  $('head').append('<link rel="stylesheet" href="/css/material-dashboard.css">');
});
