var markers = [];
var map;
var infoWindow;

var initMap = function() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.7749, lng: -122.4194 },
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
      title: input[2].value
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