import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { myAppManager } from '../../../../utils';

import './geoSection.html';

const LOCATIONSESSION = 'geoLocation';
const HEADERTITLESESSION = 'headerTitle';

Template.geoBar.onRendered(() => {
  GoogleMaps.load(({ key: 'AIzaSyCA2TbIDjEi6uFz9ZWWRBWiCwOPzNVYs0Y', libraries: 'geometry,places' }));
});

Template.geoBar.onCreated(function() {
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        const geocoder = new google.maps.Geocoder();
        const googlepos = new google.maps.LatLng(pos.lat, pos.lng);
        geocoder.geocode({ latLng: googlepos }, function(result, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            const isEmpty = Session.get(LOCATIONSESSION) == null;
            // Trying to make auto finding city more precise
            const preciseAddressComponents = result[0].address_components.slice(2);
            // const testVancouver = {"address_components":[{"long_name":"555","short_name":"555","types":["street_number"]},{"long_name":"West Broadway","short_name":"W Broadway","types":["route"]},{"long_name":"Fairview","short_name":"Fairview","types":["neighborhood","political"]},{"long_name":"Vancouver","short_name":"Vancouver","types":["locality","political"]},{"long_name":"Greater Vancouver","short_name":"Greater Vancouver","types":["administrative_area_level_2","political"]},{"long_name":"British Columbia","short_name":"BC","types":["administrative_area_level_1","political"]},{"long_name":"加拿大","short_name":"CA","types":["country","political"]},{"long_name":"V5Z 1E6","short_name":"V5Z 1E6","types":["postal_code"]}],"adr_address":"<span class=\"street-address\">555 W Broadway</span>, <span class=\"locality\">Vancouver</span>, <span class=\"region\">BC</span> <span class=\"postal-code\">V5Z 1E6</span><span class=\"country-name\">加拿大</span>","formatted_address":"555 W Broadway, Vancouver, BC V5Z 1E6加拿大","geometry":{"location":{"lat":49.26348449999999,"lng":-123.11680089999999},"viewport":{"south":49.26204881970849,"west":-123.11814988029153,"north":49.26474678029149,"east":-123.1154519197085}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png","id":"81180c2dc5e791e01b93117438de629cf20d68db","name":"555 W Broadway","place_id":"ChIJ75ALE91zhlQRDQ47h6MP6kI","plus_code":{"compound_code":"7V7M+97 加拿大 British Columbia, 温哥华","global_code":"84XR7V7M+97"},"reference":"CmRbAAAAgT3GSBE0UUarh5tpHrZv8dkqsd4Rbr_3x3kVLz6PoP9uUuHciSK7ijsq9p07coiRYx-RnTVNGiRNaZZfg0F9-DEZqMsjn954TnoRAWi2oUCTpgGa2oRLn2aEuj3fhrNlEhBaLLJ1jdaWzmXVsuFNvfgqGhRG4USjxCUmxieF-hx0ZM9CMTCEUQ","scope":"GOOGLE","types":["street_address"],"url":"https://maps.google.com/?q=555+W+Broadway,+Vancouver,+BC+V5Z+1E6%E5%8A%A0%E6%8B%BF%E5%A4%A7&ftid=0x548673dd130b90ef:0x42ea0fa3873b0e0d","utc_offset":-420,"vicinity":"Vancouver","html_attributions":[]};
            // const testRichmond = {"address_components":[{"long_name":"5555","short_name":"5555","types":["street_number"]},{"long_name":"Number 3 Road","short_name":"No. 3 Road","types":["route"]},{"long_name":"Richmond","short_name":"Richmond","types":["locality","political"]},{"long_name":"Greater Vancouver","short_name":"Greater Vancouver","types":["administrative_area_level_2","political"]},{"long_name":"British Columbia","short_name":"BC","types":["administrative_area_level_1","political"]},{"long_name":"加拿大","short_name":"CA","types":["country","political"]},{"long_name":"V6X","short_name":"V6X","types":["postal_code_prefix","postal_code"]}],"adr_address":"<span class=\"street-address\">5555 No 3 Rd</span>, <span class=\"locality\">Richmond</span>, <span class=\"region\">BC</span> <span class=\"postal-code\">V6X</span><span class=\"country-name\">加拿大</span>","formatted_address":"5555 No 3 Rd, Richmond, BC V6X加拿大","geometry":{"location":{"lat":49.1763656,"lng":-123.13757470000002},"viewport":{"south":49.1750106197085,"west":-123.13850558029151,"north":49.1777085802915,"east":-123.13580761970849}},"icon":"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png","id":"25b27ea7db2339dcd60803e1408dc9373ce1c184","name":"5555 No 3 Rd","place_id":"EiY1NTU1IE5vIDMgUmQsIFJpY2htb25kLCBCQyBWNlgsIENhbmFkYSIbEhkKFAoSCTPimvAtdYZUEd5fiO0Hj-gGELMr","reference":"CpQBhQAAAHsO7lUL7fB7pVVnB1wetZz747jOjvBO9M3cQ7QqX6yQoYDofH2kFPXf0XekocAjxlP1yGOMihstIyuJeWNGf32CxhBI1n9Udgdb_cwbBLuUUQbMWmlrkucCZyjLHZkS6HcAsytCwW9_EfPgxxvnNoET-3HFecHZty_JwpAcga2S1Fyv700wbm49pIhnBiWIgBIQmxetnOtPqIlArqPX4YlixhoUG4VepFQcSKub-Mt70bDabcEqnHs","scope":"GOOGLE","types":["street_address"],"url":"https://maps.google.com/?q=5555+No+3+Rd,+Richmond,+BC+V6X%E5%8A%A0%E6%8B%BF%E5%A4%A7&ftid=0x5486752df09ae233:0x6078b5e41dc640c9","utc_offset":-420,"vicinity":"Richmond","html_attributions":[]};
            // const preciseAddressComponents = testVancouver.address_components.slice(2);
            if (isEmpty) {
              let isRichmond = false;
              let isVancouver = false;
              let isBurnaby = false;
              if (preciseAddressComponents.filter(function(data) { return data.long_name.toLowerCase().indexOf('richmond') !== -1; }).length !== 0) {
                isRichmond = true;
                result[0].vicinity = 'richmond';
                result[0].formatted_address = '当前地址：' + 'Richmond';
              } else if (preciseAddressComponents.filter(function(data) { return data.long_name.toLowerCase().indexOf('burnaby') !== -1; }).length !== 0) {
                isBurnaby = true;
                result[0].vicinity = 'burnaby';
                result[0].formatted_address = '当前地址：' + 'Burnaby';
              } else if (preciseAddressComponents.filter(function(data) { return data.long_name.toLowerCase().indexOf('vancouver') !== -1; }).length !== 0) {
                isVancouver = true;
                result[0].vicinity = 'vancouver';
                result[0].formatted_address = '当前地址：' + 'Vancouver';
              } else {
                // outside of vancouver
                // todo: not allow user to make order when block is true
                console.log('You are outside of vanoucver');
                result[0].vicinity = '当前的地址不在服务地区';
                result[0].formatted_address = '当前的地址不在服务地区';
                myAppManager.dialog.alert('当前地址不在服务区内', '提示');
                // Session.set(LOCATIONSESSION, result[0]);
                // Session.set('block', true);
                // return null;
              }
              // result[0].url = 'https://www.google.com/maps/search/?api=1&' + result[0].formatted_address;
              Session.set(LOCATIONSESSION, result[0]);
              Session.set('block', true);
            }
          } else {
            alert('Geocoder failed due to: ' + status);
          }
        });
      });
    } else {
      // Browser doesn't support Geolocation
      console.log('fails');
    }
  });
});

Template.geoBar.helpers({
  location() {
    const location = Session.get(LOCATIONSESSION);
    if (location == null || locationbar === '') {
      return null;
    }
    return location.formatted_address;
  },
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
  }
});

Template.geoBar.events({
  'click .home-geo-bar'(e) {
    Session.set(HEADERTITLESESSION, '请输入用餐地');
    FlowRouter.go('/updateLocation');
    Session.set('page', 'order');
  }
});
