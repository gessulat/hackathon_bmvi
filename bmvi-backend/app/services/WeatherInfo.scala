package services;

import play.api.libs.json._
import play.api.libs.functional.syntax._

case class WeatherInfo(
    lon: Double, 
    lat: Double, 
    name: String, 
    temperature: Double, 
    rain: Option[Double], 
    snow: Option[Double],
    datetime: Int // UNIX timestamp
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
    implicit val writes: Writes[WeatherInfo] = Json.writes[WeatherInfo]
}