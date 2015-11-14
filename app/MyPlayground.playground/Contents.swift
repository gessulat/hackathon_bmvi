//: Playground - noun: a place where people can play

import UIKit
import MapKit

func handleDirections(response : MKDirectionsResponse ) {
    print(response.routes)
}

var request = MKDirectionsRequest()
var berlin = MKPlacemark(coordinate: CLLocationCoordinate2D(latitude: 52.529526, longitude: 13.378539), addressDictionary: nil)
var source = MKMapItem(placemark: berlin)

var munich = MKPlacemark(coordinate: CLLocationCoordinate2D(latitude: 48.218936, longitude: 11.624482), addressDictionary: nil)
var dest = MKMapItem(placemark: munich)

request.source = source
request.destination = dest

var directions = MKDirections(request: request)

directions.calculateDirectionsWithCompletionHandler { (response, error) -> Void in
    handleDirections(response!)
}
