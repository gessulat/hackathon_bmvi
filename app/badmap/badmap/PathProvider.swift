//
//  PathProvider.swift
//  badmap
//
//  Created by Engin Kurutepe on 13/11/15.
//  Copyright © 2015 Fifteen Jugglers Software. All rights reserved.
//

import MapKit
import GoogleMaps

class Path {
    let totalCost : Double
    let polyline : MKPolyline
    let points : [CLLocationCoordinate2D]
    
    init(points : [CLLocationCoordinate2D], pl : MKPolyline, cost : Double) {
        self.totalCost = cost;
        self.polyline = pl;
        self.points = points
    }
}

class PathProvider {

    let googleAPIKey: String
    let routesArray: [String:[String:AnyObject]]
    
    init(apiKey : String, routes : [String:[String:AnyObject]]) {
        googleAPIKey = apiKey
        routesArray = routes
    }
    
    func pathForKey(key: String) -> Path? {
        
        guard let routeDict = self.routesArray[key] else { return nil }
        
        guard let encodedPath = routeDict["points"] as? String else { return nil }
        
        let gmsPath = GMSPath(fromEncodedPath: encodedPath)
        let count = Int(gmsPath.count())
        var coords : [CLLocationCoordinate2D] = []
        coords.reserveCapacity(count)
        
        for idx in 0..<gmsPath.count() {
            coords.append(gmsPath.coordinateAtIndex(idx))
        }
        
        let polyline = MKGeodesicPolyline(coordinates: UnsafeMutablePointer(coords), count: count)
    
        return Path(points:coords, pl: polyline, cost: 0.0)
    }

}
