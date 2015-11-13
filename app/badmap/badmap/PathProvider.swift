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
    
    init(pl : MKPolyline, cost : Double) {
        totalCost = cost;
        polyline = pl;
    }
}

class PathProvider {

    let googleAPIKey: String
    let routesArray: [[String:AnyObject]]
    
    init(apiKey : String, routes : [[String:AnyObject]]) {
        googleAPIKey = apiKey
        routesArray = routes
    }
    
    func pathAtIndex(idx: Int) -> Path? {
        guard idx < routesArray.count else { return nil }
        
        let routeDict = self.routesArray[idx]
        
        guard let cost = Double(routeDict["maut_cost_eur"] as! String) else { return nil }
        
        guard let encodedPath = routeDict["path"] as? String else { return nil }
        
        let gmsPath = GMSPath(fromEncodedPath: encodedPath)
        let count = Int(gmsPath.count())
        var coords : [CLLocationCoordinate2D] = []
        coords.reserveCapacity(count)
        
        for idx in 0..<gmsPath.count() {
            coords.append(gmsPath.coordinateAtIndex(idx))
        }
        
        let polyline = MKGeodesicPolyline(coordinates: UnsafeMutablePointer(coords), count: count)
    
        return Path(pl: polyline, cost: cost)
    }

}
