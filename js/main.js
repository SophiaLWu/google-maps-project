var markers = [];
var map;
var infoWindow;

var initMap = function() {
  var styles = [
    {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [
        {
           "color": "#6195a0"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "lightness": "0"
        },
        {
          "saturation": "0"
        },
        {
          "color": "#f5f5f2"
        },
        {
          "gamma": "1"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "all",
      "stylers": [
        {
          "lightness": "-3"
        },
        {
          "gamma": "1.00"
        }
      ]
    },
    {
      "featureType": "landscape.natural.terrain",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#bae5ce"
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
        {
          "saturation": -100
        },
        {
          "lightness": 45
        },
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#fac9a9"
        },
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#787878"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "transit.station.airport",
      "elementType": "labels.icon",
      "stylers": [
        {
          "hue": "#0a00ff"
        },
        {
          "saturation": "-77"
        },
        {
          "gamma": "0.57"
        },
        {
          "lightness": "0"
        }
      ]
    },
    {
      "featureType": "transit.station.rail",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#43321e"
        }
      ]
    },
    {
      "featureType": "transit.station.rail",
      "elementType": "labels.icon",
      "stylers": [
        {
          "hue": "#ff6c00"
        },
        {
          "lightness": "4"
        },
        {
          "gamma": "0.75"
        },
        {
          "saturation": "-68"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
        {
          "color": "#eaf6f8"
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#c7eced"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "lightness": "-49"
        },
        {
          "saturation": "-53"
        },
        {
          "gamma": "0.79"
        }
      ]
    }
]

  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.7854, lng: -122.4435 },
    styles: styles,
    zoom: 13
  });
  infoWindow = new google.maps.InfoWindow();
}

$(document).ready(function() {

  var showMarkers = function() {
    if (markers.length > 0) {
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
      }
      map.fitBounds(bounds);
    }
  };

  var hideMarkers = function() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  };

  var addMarker = function() {
    var input = $("#message-form").serializeArray();
    var position = { lat: parseFloat(input[0].value), 
                     lng: parseFloat(input[1].value) };
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: input[2].value,
      animation: google.maps.Animation.DROP
    });
    markers.push(marker);
    addInfoWindow(marker);
    map.panTo(position);
  };

  var addInfoWindow = function(marker) {
    marker.addListener("click", function() {
      if (infoWindow.marker != marker) {
        infoWindow.marker = marker;
        infoWindow.setContent("<div class='marker-info'>" + marker.title + "</div");
        infoWindow.open(map, marker);
      }
    });
  };

  $("#message-form").submit(function(event) {
    event.preventDefault();
    addMarker();
  });

  $("#show-markers").on("click", showMarkers);
  $("#hide-markers").on("click", hideMarkers);

});