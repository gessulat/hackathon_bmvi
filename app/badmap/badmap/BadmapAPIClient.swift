//
//  BadmapAPIClient.swift
//  badmap
//
//  Created by Engin Kurutepe on 13/11/15.
//  Copyright © 2015 Fifteen Jugglers Software. All rights reserved.
//

import Foundation

class BadmapAPIClient {
    
    class func fetchPath(completion : [String:[String:AnyObject]]? -> ()) {
        guard let url = NSBundle.mainBundle().URLForResource("routes", withExtension: "json") else { completion(nil); return }
        
        guard let data = NSData(contentsOfURL: url) else { completion(nil); return }
        
        let json = try! NSJSONSerialization.JSONObjectWithData(data, options: [])
        
        guard let resultsArray = json as? [String:[String:AnyObject]] else { return }
        
        guard let routes = resultsArray["routes"] as? [String:[String:AnyObject]] else { return }
        
        completion(routes)
    }
    
}