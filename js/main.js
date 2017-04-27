var markers = [];
var map;

var initMap = function() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7749, lng: -122.4194},
    zoom: 13
  });
}

$(document).ready(function() {
  
  var addMarker = function() {
    var input = $("#message-form").serializeArray();
    console.log(input);
    var latitude = parseFloat(input[0].value);
    var longitude = parseFloat(input[1].value);
    var marker = new google.maps.Marker({
      position: {lat: latitude, lng: longitude},
      map: map,
      title: input[2].value
    });
    markers.push(marker);
    addInfoWindow(marker);
  };

  var addInfoWindow = function(marker) {
    var infoWindow = new google.maps.InfoWindow();
    infoWindow.marker = marker;
    marker.addListener("click", function() {
      infoWindow.setContent("<div class='marker-info'>" + marker.title + "</div");
      infoWindow.open(map, marker);
    });
  };

  $("#message-form").submit(function(event) {
    event.preventDefault();
    addMarker();
  });
});