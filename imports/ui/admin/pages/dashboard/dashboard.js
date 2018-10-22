import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './dashboard.html';
import './map';
// import '../../../../../public/js/plugins/google-maps';

Template.adminDashboard.onRendered(() => {
  // const map = new google.maps.Map(document.getElementById('satelliteMap'), {
  //   zoom: 10,
  //   center: { lat: 49.284691099999996, lng: -123.11180460000003 },
  // });
  GoogleMaps.load({key: 'AIzaSyCA2TbIDjEi6uFz9ZWWRBWiCwOPzNVYs0Y', libraries: 'places' });

});
