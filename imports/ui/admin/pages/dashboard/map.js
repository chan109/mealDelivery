import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './map.html';

Template.map.helpers({
  // init google map, the following code only runs once
  mapOptions() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(49.203957, -123.134655),
        // center: new google.maps.LatLng( 24.886, -70.268),
        // zoom: 10
        zoom: 11,
        gestureHandling: 'none',
        scrollwheel: false,
        zoomControl: false,
        disableDoubleClickZoom: true,
        fullscreenControl: false
      };
    }
    return null;
  }
});

Template.map.onCreated(function() {
  GoogleMaps.ready('map', function(map) {
    const vancouverTriangleCoords = [
      { lat: 49.273102, lng: -123.264088 },
      { lat: 49.277911, lng: -123.145161 },
      { lat: 49.309896, lng: -123.154462 },
      { lat: 49.289746, lng: -123.100217 },
      { lat: 49.292209, lng: -123.023999 },
      { lat: 49.203235, lng: -123.024686 },
      { lat: 49.201714, lng: -123.136372 }
    ];

    const richmondTriangleCoords = [
      { lat: 49.174787, lng: -123.198170 },
      { lat: 49.123811, lng: -123.200230 },
      { lat: 49.126660, lng: -123.087075 },
      { lat: 49.197901, lng: -123.080577 }
    ];

    const burnabyTriangleCoords = [
      { lat: 49.293340, lng: -123.023078 },
      { lat: 49.291179, lng: -122.894794 },
      { lat: 49.238326, lng: -122.894794 },
      { lat: 49.202402, lng: -122.960702 },
      { lat: 49.194468, lng: -122.953823 },
      { lat: 49.182071, lng: -122.979780 },
      { lat: 49.201341, lng: -123.022897 }
    ];

    // Construct the polygon.
    const vancouverBermudaTriangle = new google.maps.Polygon({
      paths: vancouverTriangleCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#f44336',
      fillOpacity: 0.35,

      // content can be used to store custom data
      content: 'vancouver'
    });

    const richmondBermudaTriangle = new google.maps.Polygon({
      paths: richmondTriangleCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#4caf50',
      fillOpacity: 0.35,

      // content can be used to store custom data
      content: 'richmond'
    });

    const burnabyBermudaTriangle = new google.maps.Polygon({
      paths: burnabyTriangleCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#2196f3',
      fillOpacity: 0.35,

      // content can be used to store custom data
      content: 'burnaby'
    });

    vancouverBermudaTriangle.setMap(map.instance);
    richmondBermudaTriangle.setMap(map.instance);
    burnabyBermudaTriangle.setMap(map.instance);

    vancouverBermudaTriangle.addListener('click', function(e) {
      // Todo: jump to page, where manager all the riders.
      FlowRouter.go('/admin/order/A');
      
    });

    richmondBermudaTriangle.addListener('click', function(e) {
      // Todo: jump to page, where manager all the riders.
      FlowRouter.go('/admin/order/B');
      
    });

    burnabyBermudaTriangle.addListener('click', function(e) {
      // Todo: jump to page, where manager all the riders.
      FlowRouter.go('/admin/order/C');
    });
  });
});
