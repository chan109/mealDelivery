import { Template } from 'meteor/templating';
import './home.html';
import './items';
import './orderItemsSection';
import './timeNavBar';
import './geoSection/getoSection';

Template.home.onRendered(function() {
  // $('.food-container').height($('body').height()-$('.navbar').height()-$('.toolbar').height() - $('.home-order-section').height());
});