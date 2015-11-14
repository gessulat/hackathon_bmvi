//
//  RouteCell.swift
//  badmap
//
//  Created by Engin Kurutepe on 14/11/15.
//  Copyright © 2015 Fifteen Jugglers Software. All rights reserved.
//

import UIKit

class RouteCell: UITableViewCell {

    @IBOutlet weak var routeLabel: UILabel!
    @IBOutlet weak var mautCostLabel: UILabel!
    @IBOutlet weak var distanceLabel: UILabel!
    @IBOutlet weak var selectButton: UIButton!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
    func setRouteName(name:String) {
        self.routeLabel.text = "  \(name)  "
    }
    
    func setRouteCost(cost:Double) {
        self.mautCostLabel.text = "Mautkosten: \(cost)€"
    }
    
    func setRouteDistance(distance:String) {
        self.distanceLabel.text = "Strecke: \(distance)"
    }

}
