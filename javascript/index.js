mapboxgl.accessToken = 'pk.eyJ1Ijoic3VwZXJvbWFyaW8iLCJhIjoiY2p3NnExOW80MWVtcDRhbzZnNm9xaXpsMiJ9.L7je2_X-JmFNb7yhIznQMg';
var map = new mapboxgl.Map({
  container: 'map', // Container ID
  style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
  center: [-8.468399, 51.8985], // Starting position [lng, lat]
  zoom: 12 // Starting zoom level
});

var marker = new mapboxgl.Marker() // Initialize a new marker
  .setLngLat([-8.468399, 51.8985]) // Marker [lng, lat] coordinates
  .addTo(map); // Add the marker to the map

var geocoder = new MapboxGeocoder({ // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: 'Search for places in Ireland', // Placeholder text for the search bar
  bbox: [-10.953372631330552,51.41797070026601,-5.667712546362168,53.15797863607713], // Boundary for Cork
  proximity: {
    longitude: 51.8921,
    latitude: -8.4933
  } // Coordinates of Cork
});

// Add the geocoder to the map
map.addControl(geocoder);

// After the map style has loaded on the page,
// add a source layer and default styling for a single point
map.on('load', function() {
  map.addSource('single-point', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  });

  map.addLayer({
    id: 'point',
    source: 'single-point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#448ee4'
    }
  });

  // Listen for the `result` event from the Geocoder
  // `result` event is triggered when a user makes a selection
  // Add a marker at the result's coordinates
  geocoder.on('result', function(ev) {
    map.getSource('single-point').setData(ev.result.geometry);
  });
});

map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

  

