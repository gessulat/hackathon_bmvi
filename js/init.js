var locations = {
    bmvi: [52.529208, 13.378254]
};

function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(locations.bmvi[0], locations.bmvi[1]),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        mapOptions);
}
