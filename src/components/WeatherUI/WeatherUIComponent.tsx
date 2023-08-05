import { IonCard, IonCardContent, IonCol, IonGrid, IonRow } from "@ionic/react";
import "./WeatherUIComponent.css";
import PipeService from "../../pipes/pipe.service";
import { useState, useEffect } from "react";
import moment from "moment";

interface ContainerProps {
  weatherInfo: any;
}

const WeatherUIComponent: React.FC<ContainerProps> = (props) => {

  const [classForBackground, setClassForBackground] = useState("weather-morning");
  
  if (props.weatherInfo != null) {
    props.weatherInfo["weatherCondImg"] = PipeService.getWeatherSourceByCond(
      props.weatherInfo.weather[0].main
    );
  }

  useEffect(() => {
    if(props.weatherInfo != null){
      ChangeWeatherBackground(props.weatherInfo.dateTime);
    }
  }, [props]);
  
  
  const ChangeWeatherBackground = (dateTime) => {
    const hour = moment(dateTime).hour();
    
    if (hour >= 5 && hour < 12) { // Morning (5 AM to 12 PM)
      setClassForBackground("weather-morning")
    } else if (hour >= 12 && hour < 16) { // Afternoon (12 PM to 6 PM)
      setClassForBackground("weather-afternoon")
    } else if ((hour >= 16 && hour < 19)) {  // late noon (4PM to 7 PM)
      setClassForBackground("weather-latenoon")
    } else {
      setClassForBackground("weather-night")
    }

  };
  
  

  return (
    <div>
      {props.weatherInfo != null ? (
        <div>
          {/* <IonCard className="weather-bg"> */}
          <IonCard className={classForBackground}>
            <IonCardContent class="py-50">
              <IonGrid>
                <IonRow className="align-items-center">
                  <IonCol className="col-12 col-lg-6">
                    <div className="container">
                      <div className="weather-container">
                        <p className="txt-cityCountry">
                          {props.weatherInfo.name},{" "}
                          {props.weatherInfo.sys.country}
                        </p>
                        <div className="d-flex flex-row align-items-center py-4">
                          <img
                            src={props.weatherInfo.weatherCondImg}
                            alt=""
                            height={40}
                            width={40}
                          />
                          <p className="txt-weatherCondi">
                            {props.weatherInfo.weather[0].main}
                          </p>
                        </div>
                        <p className="txt-temp py-3">
                          {Math.round(props.weatherInfo.main.temp)}°
                        </p>
                      </div>
                    </div>
                  </IonCol>
                  <IonCol className="col-12 col-lg-6">
                    <div className="container">
                      <div className="weatherdesc-container">
                        <div className="my-1">
                          <p className="txt-title">Description</p>
                          <p className="txt-result">
                            {props.weatherInfo.weather[0].description}
                          </p>
                        </div>

                        <div className="my-1">
                          <p className="txt-title">Temperature</p>
                          <p className="txt-result">
                            {props.weatherInfo.main.temp_min}°C ~{" "}
                            {props.weatherInfo.main.temp_max}°C
                          </p>
                        </div>

                        <div className="my-1">
                          <p className="txt-title">Humidity</p>
                          <p className="txt-result">
                            {props.weatherInfo.main.humidity}%
                          </p>
                        </div>

                        <div className="my-1">
                          <p className="txt-title">Time</p>
                          <p className="txt-result">
                            {props.weatherInfo.dateTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </div>
      ) : (
        <IonCard>
          <IonCardContent class="p-0 m-5">
            <IonGrid>
              <IonRow>
                <IonCol className="col-12">
                  <div className="container">
                    <div className="weather-container text-center">
                      <img
                        src="assets/errors/noData.png"
                        height={200}
                        width={200}
                      />
                      <div className="txt-noData">
                        There is no weather to display
                      </div>
                      <div className="txt-noDataInfo">
                        Please key-in the correct city and country inorder to
                        get the weather.
                      </div>
                    </div>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      )}
    </div>
  );
};

export default WeatherUIComponent;
