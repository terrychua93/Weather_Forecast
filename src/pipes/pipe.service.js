import moment, { Moment } from 'moment-timezone';

const PipeService = {
    convertDateTimeWithType(type,locale) {
            switch (type) {
                case "datetime": {
                  return moment(new Date()).format('D MMM YYYY, h:mm A');
                }
                  
                case "date": {
                  return moment(new Date()).format('D MMM YYYY');
                }

                case "time": {
                  return moment(new Date()).format('h:mm A');
                }

                case "locale": {
                    return moment(new Date()).tz(locale).format('D MMM YYYY, h:mm A');
                }
              }
    },


    getWeatherSourceByCond(condition){
        switch (condition) {
            case "Clouds":
                return "assets/weathers/cloudy-day.png"
                break;
            case "Rain":
                return "assets/weathers/rain.png"
                break;
            case "Snow":
                return "assets/weathers/snowing.png"
                break;
            case "Mist":
                return "assets/weathers/mist.png"
                break;
            case "Clear":
                return "assets/weathers/clear.png"
                break;    
            case "Windy":
                return "assets/weathers/tornado.png"
                break;   
            default:
                return "assets/weathers/clear.png"
                break;
        } 
    },


    setCapitialize(data){
        return data.charAt(0).toUpperCase() + data.slice(1);
    }

};

export default PipeService;