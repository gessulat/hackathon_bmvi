package controllers

import play.api._
import play.api.mvc._
import play.api.libs.ws._
import play.api.libs.json._
import play.api.libs.functional.syntax._

import play.api.Play.current
import scala.concurrent.ExecutionContext.Implicits.global

class Application extends Controller {

  def weatherForCity(city: String) = 
    weatherFor(s"http://api.openweathermap.org/data/2.5/weather?q=$city&units=metric&appid=93806bb3a2fe3583213396f8d4b37f36")
    
  def weatherForCoords(lat: Double, lon: Double) = 
    weatherFor(s"http://api.openweathermap.org/data/2.5/weather?lat=$lat&lon=$lon&units=metric&appid=93806bb3a2fe3583213396f8d4b37f36")
  
  private def weatherFor(requestUrl: String) = Action.async {
    WS.url(requestUrl)
      .get()
      .map({ response =>
        response.json.validate[WeatherInfo] match {
            case JsSuccess(weather, _) => Ok(Json.toJson(weather))
            case err@JsError(_) => BadRequest(JsError.toJson(err))
        }
      })    
  }

}

case class WeatherInfo(
    lon: Double, 
    lat: Double, 
    name: String, 
    temperature: Double, 
    rain: Option[Double], 
    snow: Option[Double]
)

/*
{"coord":{"lon":11.07,"lat":49.45},"weather":[
 {"id":500,"main":"Rain","description":"light rain","icon":"10n"}
 ],"base":"cmc stations",
 "main":{"temp":281.913,"pressure":985.08,"humidity":97,"temp_min":281.913,"temp_max":281.913,"sea_level":1040.49,"grnd_level":985.08},
 "wind":{"speed":7.53,"deg":295.002},
 "rain":{"3h":2.0375},
 "clouds":{"all":68},"dt":1447458072,
 "sys":{"message":0.0096,"country":"DE","sunrise":1447395859,"sunset":1447428915},"id":2861650,"name":"Nuremberg","cod":200
}
 */

object WeatherInfo {
    implicit val reads: Reads[WeatherInfo] = (
        (__ \ "coord" \ "lon")  .read[Double] and
        (__ \ "coord" \ "lat")  .read[Double] and
        (__ \ "name")           .read[String] and
        (__ \ "main" \ "temp")  .read[Double] and
        (__ \ "rain" \ "3h")    .readNullable[Double].orElse(Reads.pure(None)) and
        (__ \ "snow" \ "3h")    .readNullable[Double].orElse(Reads.pure(None))
    )(WeatherInfo.apply _)
    
    implicit val writes: Writes[WeatherInfo] = Json.writes[WeatherInfo]
}