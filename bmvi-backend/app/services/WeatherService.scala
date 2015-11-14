package services

import scala.concurrent.Future
import play.api.libs.ws._
import play.api.libs.json._
import play.api.libs.functional.syntax._

import scala.concurrent.ExecutionContext.Implicits.global

object WeatherService {
    
    def weatherFor(city: String): Future[WeatherInfo] = current(s"q=$city")
    def weatherFor(lat: Double, lon: Double): Future[WeatherInfo] = current(s"lat=$lat&lon=$lon")
    
    def forecastFor(city: String): Future[List[WeatherInfo]] = forecast(s"q=$city")
    def forecastFor(lat: Double, lon: Double): Future[List[WeatherInfo]] = forecast(s"lat=$lat&lon=$lon")
    
    private def current(method: String): Future[WeatherInfo] = 
      WS.url(s"http://api.openweathermap.org/data/2.5/weather?$method&units=metric&appid=93806bb3a2fe3583213396f8d4b37f36")(play.api.Play.current)
        .get()
        .map({ response =>
          response.json.validate[WeatherInfo](weatherReads) match {
            case JsSuccess(weather, _) => weather
            case err@JsError(_) => 
              throw new IllegalStateException(s"Received invalid response $err")
          }
        })
        
    private def forecast(method: String): Future[List[WeatherInfo]] =
      WS.url(s"http://api.openweathermap.org/data/2.5/forecast?$method&units=metric&appid=93806bb3a2fe3583213396f8d4b37f36")(play.api.Play.current)
        .get()
        .map({ response =>
          response.json.validate[List[WeatherInfo]](forecastReads) match {
            case JsSuccess(weather, _) => weather
            case err@JsError(_) => 
              println(response.body)
              throw new IllegalStateException(s"Received invalid response $err")
          }
        })
        
    private val weatherReads: Reads[WeatherInfo] = (
        (__ \ "coord" \ "lon")  .read[Double] and
        (__ \ "coord" \ "lat")  .read[Double] and
        (__ \ "name")           .read[String] and
        (__ \ "main" \ "temp")  .read[Double] and
        (__ \ "rain" \ "3h")    .readNullable[Double].orElse(Reads.pure(None)) and
        (__ \ "snow" \ "3h")    .readNullable[Double].orElse(Reads.pure(None)) and
        (__ \ "dt")             .read[Int]
    )(WeatherInfo.apply _)  
    
    private val forecastReads: Reads[List[WeatherInfo]] = (
        (__ \ "city" \ "coord" \ "lon")  .read[Double] and
        (__ \ "city" \ "coord" \ "lat")  .read[Double] and
        (__ \ "city" \ "name")  .read[String] and
        (__ \ "list").read(Reads.seq((
            (__ \ "main" \ "temp") .read[Double] and
            (__ \ "rain" \ "3h")   .readNullable[Double].orElse(Reads.pure(None)) and
            (__ \ "snow" \ "3h")   .readNullable[Double].orElse(Reads.pure(None)) and
            (__ \ "dt")            .read[Int]    
        ).tupled))
    )({ (lon, lat, name, infos)  => infos.map({ case (temperature, rain, snow, time) => 
        WeatherInfo(lon, lat, name, temperature, rain, snow, time)
    }).toList })   
}
