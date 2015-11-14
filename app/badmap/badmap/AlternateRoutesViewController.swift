//
//  AlternateRoutesViewController.swift
//  badmap
//
//  Created by Engin Kurutepe on 14/11/15.
//  Copyright © 2015 Fifteen Jugglers Software. All rights reserved.
//

import UIKit
import MapKit

protocol AlternateRoutesDelegate {
    func didSelectAlternateRoute(route:Path?)
}

class AlternateRoutesViewController: UIViewController, UITableViewDataSource, UITableViewDelegate, MKMapViewDelegate {

    @IBOutlet weak var mapview: MKMapView!
    @IBOutlet weak var tableview: UITableView!
    
    var delegate : AlternateRoutesDelegate?
    var routes = [String:Path]()

    override func viewDidLoad() {
        super.viewDidLoad()
        
        for tuple in self.routes {
            self.mapview.addOverlay(tuple.1.polyline)
        }
    }

    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }
    
    @IBAction func didTapDone(sender: AnyObject) {
        self.delegate?.didSelectAlternateRoute(nil)
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.routes.keys.count
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("RouteCell", forIndexPath: indexPath)
        
        guard let routeCell = cell as? RouteCell else { return cell }
        
        guard let route = self.routes[Array(self.routes.keys)[indexPath.item]] else { return routeCell }
        
        routeCell.setRouteName(route.name ?? "")
        routeCell.setRouteCost(route.totalCost)
        routeCell.setRouteDistance(route.length ?? "")
        
        return routeCell
    }
    
    func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        guard let route = self.routes[Array(self.routes.keys)[indexPath.item]] else { return }
        
        
        self.delegate?.didSelectAlternateRoute(route)
    }
    
    class Colors {
        let colors = [UIColor.blueColor(), UIColor.redColor(), UIColor.greenColor(), UIColor.purpleColor()]
        
        var currentIndex = 0
        
        func nextColor() -> UIColor {
            let col = colors[(currentIndex++)%colors.count]

            return col
        }
    }
    
    let colors = Colors()
    
    func mapView(mapView: MKMapView, rendererForOverlay overlay: MKOverlay) -> MKOverlayRenderer {
        
        let renderer = MKPolylineRenderer(overlay: overlay)
        
        renderer.strokeColor = colors.nextColor()
        renderer.lineWidth = 3.0;
        
        return renderer
        
    }
}
