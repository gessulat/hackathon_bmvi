//
//  MapCameraProvider.swift
//  badmap
//
//  Created by Engin Kurutepe on 14/11/15.
//  Copyright © 2015 Fifteen Jugglers Software. All rights reserved.
//

import UIKit
import MapKit

class MapCameraProvider : NSObject {

    let points : [CLLocationCoordinate2D]
    var currentIndex = 0
    
    init(_ ps: [CLLocationCoordinate2D]) {
        points = ps
    }
    
    func numberOfCameras() -> Int {
        return self.points.count
    }
    
    func cameraAtIndex(index: Int) -> MKMapCamera {
        let offset = 20
        guard index < points.count-offset else {return self.cameraAtIndex(points.count-offset-1)}
        
        currentIndex = index
        
        let center = self.points[index]
        let target = self.points[index+offset]
        
        let latDelta = center.latitude - target.latitude
        let lngDelta = center.longitude - target.longitude
        
        let source = CLLocationCoordinate2D(latitude: target.latitude + 5*latDelta, longitude: target.longitude + 5*lngDelta)
        
        return MKMapCamera(lookingAtCenterCoordinate: center, fromEyeCoordinate: source, eyeAltitude: 0)
    }
}
