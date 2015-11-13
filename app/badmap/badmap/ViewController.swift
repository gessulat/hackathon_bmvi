//
//  ViewController.swift
//  badmap
//
//  Created by Engin Kurutepe on 13/11/15.
//  Copyright © 2015 Fifteen Jugglers Software. All rights reserved.
//

import UIKit
import MapKit

class ViewController: UIViewController {

    @IBOutlet weak var mapview: MKMapView!
    override func viewDidLoad() {
        super.viewDidLoad()
        BadmapAPIClient.fetchPath { (maybeData) -> () in
            guard let data = maybeData else { return }
            
            let json = try! NSJSONSerialization.JSONObjectWithData(data, options: [])
            
            guard let resultsArray = json as? [[String:AnyObject]] else { return }
            
            let paths = PathProvider(apiKey: "AIzaSyDVh7Mwoa2LPKzCo3ngFnVcGl46ByNMHCk", routes: resultsArray)
            
            let path = paths.pathAtIndex(0)
            
            guard let polyline = path?.polyline else { return }
            
            self.mapview.addAnnotation(polyline)
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

