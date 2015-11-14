//
//  ViewController.swift
//  badmap
//
//  Created by Engin Kurutepe on 13/11/15.
//  Copyright © 2015 Fifteen Jugglers Software. All rights reserved.
//

import UIKit
import MapKit

class ViewController: UIViewController, MKMapViewDelegate, AlternateRoutesDelegate {

    @IBOutlet weak var mapview: MKMapView!
    
    @IBOutlet weak var costLabel: UILabel!
    @IBOutlet weak var routeLabel: UILabel!
    @IBOutlet weak var alternativeButton: UIButton!
    
    @IBOutlet var longPress: UILongPressGestureRecognizer!
    
    @IBAction func didTapAlternative(sender: AnyObject) {
        guard let alternateRoutes = self.storyboard?.instantiateViewControllerWithIdentifier("AlternateRoutesViewController") as? AlternateRoutesViewController else { return }
        
        alternateRoutes.delegate = self
        alternateRoutes.routes = self.paths
        self.cameraTimer?.invalidate()
        self.presentViewController(alternateRoutes, animated: true, completion: nil)
    }
    
    func handleLongPress(longPress:UILongPressGestureRecognizer) {

        if longPress.state == .Began {
            
            self.costLabel.text = "Mautkosten: 201€"
            let alert = UIAlertController(title: "Mautänderung",
                message: "Die Maut für die Route hat sich auf 201€ erhöht", preferredStyle: .Alert)
            
            let alternateAction = UIAlertAction(title: "Alternative Route", style: .Default, handler: { (action) -> Void in
                self.didTapAlternative(action)
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
            
            self.cameraProvider = MapCameraProvider(a9path!.points)

        }
    }
    
    override func viewDidAppear(animated: Bool) {
    }
    
    func setNextCamera() {
        let index = self.cameraProvider.currentIndex
        let nextIndex = index + 1
        
        let camera = self.cameraProvider.cameraAtIndex(nextIndex)
        
        self.mapview.setCamera(camera, animated: true)
    }
    
    func setCameraIndex(idx : Int ) {
        self.cameraTimer?.invalidate()
        
        let camera = self.cameraProvider.cameraAtIndex(idx)
        self.cameraProvider.currentIndex = idx
        self.mapview.setCamera(camera, animated: true)
        
        self.cameraTimer = NSTimer.scheduledTimerWithTimeInterval(2.0, target: self, selector: "setNextCamera", userInfo: nil, repeats: true)
    }

    func switchToAlternateRoute(route:Path) {
        if currentOverlay != nil {
            self.mapview.removeOverlay(self.currentOverlay!)
        }
        
        let polyline = route.polyline
        
        self.currentOverlay = polyline
        
        self.mapview.addOverlay(polyline)
        
        let index = self.cameraProvider.currentIndex
        
        self.cameraProvider = MapCameraProvider(route.points)

        self.setCameraIndex(index)
        
        self.alternativeButton.hidden = true
        
        self.costLabel.text = "Mautkosten: \(route.totalCost)€"
        
        self.routeLabel.text = "Von Berlin nach München über \(route.name)"
        
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

    func didSelectAlternateRoute(route: Path?) {
        self.dismissViewControllerAnimated(true, completion: nil)
        
        if let route = route {
            self.switchToAlternateRoute(route)
        }
    }

}

