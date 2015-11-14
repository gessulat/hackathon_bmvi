//
//  ViewController.swift
//  badmap
//
//  Created by Engin Kurutepe on 13/11/15.
//  Copyright © 2015 Fifteen Jugglers Software. All rights reserved.
//

import UIKit
import MapKit

class ViewController: UIViewController, MKMapViewDelegate {

    @IBOutlet weak var mapview: MKMapView!
    
    @IBOutlet weak var costLabel: UILabel!
    @IBOutlet weak var routeLabel: UILabel!
    @IBOutlet weak var alternativeButton: UIButton!
    
    @IBOutlet var longPress: UILongPressGestureRecognizer!
    
    @IBAction func didTapAlternative(sender: AnyObject) {
        self.switchToAlternateRoute()
    }
    
    func handleLongPress(longPress:UILongPressGestureRecognizer) {

        if longPress.state == .Began {
            
            self.costLabel.text = "Mautkosten: 201€"
            let alert = UIAlertController(title: "Mautänderung",
                message: "Die Maut für die Route hat sich auf 201€ erhöht", preferredStyle: .Alert)
            
            let alternateAction = UIAlertAction(title: "Alternative Route", style: .Default, handler: { (action) -> Void in
                self.switchToAlternateRoute()
            })
            
            alert.addAction(alternateAction)
            
            let ignoreAction = UIAlertAction(title: "Weiterfahren", style: .Cancel, handler: { (action) -> Void in
                self.alternativeButton.hidden = false
            })
            
            alert.addAction(ignoreAction)
            
            self.presentViewController(alert, animated: true, completion:nil)
        }
    }
    
    var paths = [String:Path]()
    var cameraProvider = MapCameraProvider([CLLocationCoordinate2D(latitude: 0, longitude: 0)])
    var currentOverlay : MKPolyline? = nil
    var cameraTimer : NSTimer? = nil
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.mapview.addGestureRecognizer(longPress)
        longPress.addTarget(self, action: "handleLongPress:")
        
        self.alternativeButton.hidden = true
        
        BadmapAPIClient.fetchPath { (maybeResults) -> () in
            
            guard let resultsArray = maybeResults else { return }
            
            let paths = PathProvider(apiKey: "AIzaSyDVh7Mwoa2LPKzCo3ngFnVcGl46ByNMHCk", routes: resultsArray)
            
            let a9path = paths.pathForKey("a9")
            
            guard let polyline = a9path?.polyline else { return }
            
            self.currentOverlay = polyline
            
            self.mapview.addOverlay(polyline)
            
            self.paths["a9"] = a9path
            
            self.mapview.setVisibleMapRect(polyline.boundingMapRect, animated: true);
            
            let a93path = paths.pathForKey("a93")
            
            self.paths["a93"] = a93path
        }
    }
    
    override func viewDidAppear(animated: Bool) {
        guard let path = paths["a9"] else { return }
        self.cameraProvider = MapCameraProvider(path.points)
    }
    
    func setNextCamera() {
        let index = cameraProvider.currentIndex
        let nextIndex = index + 1
        
        let camera = cameraProvider.cameraAtIndex(nextIndex)
        
        self.mapview.setCamera(camera, animated: true)
    }
    
    func setCameraIndex(idx : Int ) {
        self.cameraTimer?.invalidate()

        let camera = cameraProvider.cameraAtIndex(idx)
        self.mapview.setCamera(camera, animated: true)
        
        self.cameraTimer = NSTimer.scheduledTimerWithTimeInterval(2.0, target: self, selector: "setNextCamera", userInfo: nil, repeats: true)
    }

    func switchToAlternateRoute() {
        if currentOverlay != nil {
            self.mapview.removeOverlay(self.currentOverlay!)
        }
        
        let a93Path = paths["a93"]
        
        guard let polyline = a93Path?.polyline else { return }
        
        self.currentOverlay = polyline
        
        self.mapview.addOverlay(polyline)
        
        let index = self.cameraProvider.currentIndex
        
        NSObject.cancelPreviousPerformRequestsWithTarget(self)
        
        self.cameraProvider = MapCameraProvider(a93Path!.points)

        self.setCameraIndex(index-12)
        
        self.alternativeButton.hidden = true
        
        self.costLabel.text = "Mautkosten: 120€"
        
        self.routeLabel.text = "Von Berlin nach München über A93"
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func mapView(mapView: MKMapView, rendererForOverlay overlay: MKOverlay) -> MKOverlayRenderer {

        let renderer = MKPolylineRenderer(overlay: overlay)
        
        renderer.strokeColor = UIColor.blueColor()
        renderer.lineWidth = 3.0;
        
        return renderer
        
    }
    
    func mapViewDidFinishLoadingMap(mapView: MKMapView) {
        var token : dispatch_once_t = 0
        dispatch_once(&token) { () -> Void in
            self.setCameraIndex(90)
        }
    }
}

