package controllers

import play.api._
import play.api.mvc._
import play.api.libs.ws._
import play.api.libs.json._
import play.api.libs.functional.syntax._

import play.api.Play.current
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

import services.WeatherInfo
import services.WeatherService

class Application extends Controller {

  def weatherForCity(city: String) = using { WeatherService.weatherFor(city) }
  def weatherForCoords(lat: Double, lon: Double) = using { WeatherService.weatherFor(lat, lon) }
  
  def forecastForCity(city: String) = using { WeatherService.forecastFor(city) }
  def forecastForCoords(lat: Double, lon: Double) = using { WeatherService.forecastFor(lat, lon) }
  
  private def using[A: Writes](eventuallyResponse: Future[A]) = Action.async {
      eventuallyResponse.map({ response => Ok(Json.toJson(response)) })
  }

}