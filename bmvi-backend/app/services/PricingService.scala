package services

import org.joda.time.DateTime
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

object PricingService {
    
    def priceFor(numberOfKilometers: Int, city: String, dateTime: DateTime): Future[Double] = {
        WeatherService.historicFor(city, dateTime).map({ weatherInfo => 
          println(weatherInfo)
          val rainFactor = averageRain(weatherInfo)
          val snowFactor = averageSnow(weatherInfo)
          numberOfKilometers * 0.117 + (rainFactor * 20) + (snowFactor * 40) 
        })  
    }
    
    private def averageRain(weatherInfo: Option[WeatherInfo]) = average(weatherInfo, _.rain).getOrElse(0.0)
    private def averageSnow(weatherInfo: Option[WeatherInfo]) = average(weatherInfo, _.snow).getOrElse(0.0)
    
    private def averageRain(weatherInfos: List[WeatherInfo]) = average(weatherInfos, _.rain).getOrElse(0.0)
    private def averageSnow(weatherInfos: List[WeatherInfo]) = average(weatherInfos, _.snow).getOrElse(0.0)
    
    private def average(weatherInfos: TraversableOnce[WeatherInfo], f: WeatherInfo => Option[Double]): Option[Double] = {
        if (weatherInfos.isEmpty) {
            None
        } else {
            val sum = weatherInfos.foldLeft(0.0)({ 
              (acc, weatherInfo) => acc + f(weatherInfo).getOrElse(0.0)
            })
            Some(sum / weatherInfos.size)
        }   
    }
    
}