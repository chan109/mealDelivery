import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { VALIDCITY, myAppManager, sessionManager, utilHelpers } from '../../../utils';

import './updateLocation.html';

const LOCATIONSESSION = 'geoLocation';
const HEADERTITLESESSION = 'headerTitle';
const SELECTEDORDER = 'selectedOrder';

Template.updateLocation.onRendered(() => {
  GoogleMaps.load(({ key: 'AIzaSyCA2TbIDjEi6uFz9ZWWRBWiCwOPzNVYs0Y', libraries: 'geometry,places' }));
});

Template.updateLocation.helpers({
  exampleMapOptions() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 8
      };
    }
    return null;
  },
  historyAddress() {
    const curUserObj = Meteor.user();
    if (curUserObj == null) return null;
    return curUserObj.address;
  }
});

Template.updateLocation.onCreated(function() {
  // GoogleMaps.ready('map', function(map) {
  //   console.log("I'm ready!");
  // });
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    console.log('i am ready');

    let input = document.getElementById('pac-input');

    let autocomplete = new google.maps.places.Autocomplete(input, { types: 'address', componentRestrictions: { country: 'ca' } });

    autocomplete.bindTo('bounds', map.instance);

    autocomplete.addListener('place_changed', function() {
      // infowindow.close();
      // marker.setVisible(false);
      let place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      if (VALIDCITY[place.vicinity.toLowerCase()] !== 1) {
        myAppManager.dialog.alert('送餐的地址必须为以下的城市: richmond, vancouver, burnaby', '提示', function() {
          $('#pac-input').val('');
          Session.set(LOCATIONSESSION, null);
          FlowRouter.go('/updateLocation');
          Session.set('block', false);
          return null;
        });
      } else {
        if (Session.get(LOCATIONSESSION) === '' || Session.get(LOCATIONSESSION) == null || Session.get(LOCATIONSESSION).vicinity.toLowerCase() !== place.vicinity.toLowerCase()) {
          Session.set(SELECTEDORDER, null);
        }
        Session.set(LOCATIONSESSION, place);
        console.log(place);
        Session.set('block', false);
      }
    });

    $('body').on('touchend','.pac-container', function(e) {
      e.stopImmediatePropagation();
    });
  });
});

Template.updateLocation.events({
  'submit'(event) {
    event.preventDefault();
    let temp = Session.get(LOCATIONSESSION);
    if (event.target.streetName.value === '') {
      temp = '';
      Session.set(LOCATIONSESSION, '');
    }
    temp.unitNumber = event.target.unit_number.value;
    Session.set(LOCATIONSESSION, temp);
    Session.set(HEADERTITLESESSION, '');
    FlowRouter.go('/');
  },
  'click #use-history-address' (event) {
    event.preventDefault();
    let objToSave = Meteor.user().address;
    $('#pac-input').val(objToSave.name);
    objToSave = {
      formatted_address: objToSave.name,
      address_components: [{ long_name: objToSave.postCode }],
      vicinity: objToSave.city,
      unitNumber: objToSave.unitNumber,
      url: objToSave.url
    };
    Session.set('block', false);
    Session.set(LOCATIONSESSION, objToSave);
  }
});

// const address = {
//   name: location.formatted_address,
//   postCode: location.address_components[location.address_components.length - 1].long_name,
//   city: location.vicinity.toLowerCase(),
//   unitNumber: location.unitNumber,
//   url: location.url
// };