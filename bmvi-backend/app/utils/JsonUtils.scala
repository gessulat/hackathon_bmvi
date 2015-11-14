package utils

import org.joda.time.DateTime
import play.api.libs.json._
import play.api.libs.functional.syntax._
import java.text.SimpleDateFormat

object JsonUtils {
  
  implicit def dateTimeReads(pattern: String = "yyyy-MM-dd'T'HH:mm")(implicit stringReads: Reads[String]): Reads[DateTime] = stringReads.map({ str => 
    new DateTime(new SimpleDateFormat(pattern).parse(str))      
  })
  
  implicit def dateTimeWrites(pattern: String = "yyyy-MM-ddTHH:mm")(implicit stringWrites: Writes[String]): Writes[DateTime] = Writes { dateTime => 
    stringWrites.writes(dateTime.toString("yyyy-mm-ddThh:mm"))  
  }
      
}