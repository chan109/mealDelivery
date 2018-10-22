import { Template } from 'meteor/templating';
// import Framework7 from 'framework7';
import { myAppManager } from '../utils';

import '../components/tabbar/tabbar.js';
import './layout.html';


Template.mainLayout.onRendered(() => {
  // Initialize app
  const myApp = myAppManager;

  // // If we need to use custom DOM library, let's save it to $$ variable:
  const $$ = Dom7;

  $('head').append(
    '<link rel="stylesheet" href="/framework7/dist/css/framework7.md.css">',
  );
  $('html').removeClass('ios').addClass('md');
});