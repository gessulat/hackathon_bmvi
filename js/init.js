      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(52.529208, 13.378254),
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
      }
