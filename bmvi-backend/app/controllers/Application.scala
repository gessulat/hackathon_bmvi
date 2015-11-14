package controllers

import play.api._
import play.api.mvc._
import play.api.libs.ws._
import play.api.libs.json._
import play.api.libs.functional.syntax._
import org.joda.time.DateTime

import play.api.Play.current
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import services.PricingService
import services.WeatherInfo
import services.WeatherService

class Application extends Controller {
    
  def priceFor(numberOfKilometers: Int, city: String, dateTime: DateTime) = using { PricingService.priceFor(numberOfKilometers, city, dateTime) } 
  
  def pricing(dateTime: DateTime) = using {
      for {
          price1 <- PricingService.priceFor(600, "Regensburg", dateTime)
          price2 <- PricingService.priceFor(700, "Nuremberg", dateTime)
      } yield {
    val json = s"""{
    | "metadata": {
    |    "count": 2,
    |    "next": null,
    |    "previous": null
    | },
    | "results": [
    |            {
    |            "distance_m": 577123,
    |            "duration_s": 18194,
    |            "start_location": {
    |            "lat": 52.5167,
    |            "lon": 13.3833,
    |            "accuracy_m": 3.9
    |            },
    |            "start_address": {
    |            "name": "Bundesministerium für Verkehr und digitale Infrastruktur",
    |            "street_number": "44",
    |            "street_name": "Invalidenstraße",
    |            "city": "Berlin",
    |            "country": "DE"
    |            },
    |            "end_location": {
    |            "lat": 48.1333,
    |            "lon": 11.5667,
    |            "accuracy_m": 9
    |            },
    |            "end_address": {
    |            "name": "Allianz Arena",
    |            "street_number": "25",
    |            "street_name": "Werner-Heisenberg-Allee",
    |            "city": "München",
    |            "country": "DE"
    |            },
    |      
    |            "maut_cost_eur": $price1
    |            },
    |            {
    |            "distance_m": 616345,
    |            "duration_s": 20040,
    |            "start_location": {
    |            "lat": 52.5167,
    |            "lon": 13.3833,
    |           "accuracy_m": 3.9
    |            },
    |            "start_address": {
    |            "name": "Bundesministerium für Verkehr und digitale Infrastruktur",
    |            "street_number": "44",
    |            "street_name": "Invalidenstraße",
    |            "city": "Berlin",
    |            "country": "DE"
    |            },
    |            "end_location": {
    |            "lat": 48.1333,
    |            "lon": 11.5667,
    |            "accuracy_m": 9
    |            },
    |            "end_address": {
    |            "name": "Allianz Arena",
    |            "street_number": "25",
    |            "street_name": "Werner-Heisenberg-Allee",
    |            "city": "München",
    |            "country": "DE"
    |            },
    |
    |            "maut_cost_eur": $price2
    |            }
    |            ]
}""".stripMargin.replace("\n", "") 
          Json.parse(json)
      }
  }

  def historicForCity(city: String, date: DateTime) = using { WeatherService.historicFor(city, date) }

  def weatherForCity(city: String) = using { WeatherService.weatherFor(city) }
  def weatherForCoords(lat: Double, lon: Double) = using { WeatherService.weatherFor(lat, lon) }
  
  def forecastForCity(city: String) = using { WeatherService.forecastFor(city) }
  def forecastForCoords(lat: Double, lon: Double) = using { WeatherService.forecastFor(lat, lon) }
  
  private def using[A: Writes](eventuallyResponse: Future[A]) = Action.async {
      eventuallyResponse.map({ response => Ok(Json.toJson(response)) })
  }

}