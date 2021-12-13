import { IonCard, IonCardContent, IonCol, IonGrid, IonRow } from '@ionic/react';
import './WeatherUIComponent.css';
import moment, { Moment } from 'moment-timezone'

//Weather image
// Notice : not sure why have to import one by one to get the image, I tried many method on google still have error.



interface ContainerProps {
    weatherInfo: any;
 }

const WeatherUIComponent: React.FC<ContainerProps> = (props) => {
    if(props.weatherInfo != null){
        switch (props.weatherInfo.weather[0].main) {
            case "Clouds":
                props.weatherInfo['weatherCondImg'] = "assets/weathers/cloudy-day.png"
                break;
            case "Rain":
                props.weatherInfo['weatherCondImg'] = "assets/weathers/rain.png"
                break;
            case "Snow":
                props.weatherInfo['weatherCondImg'] = "assets/weathers/snowing.png"
                break;
            case "Mist":
                props.weatherInfo['weatherCondImg'] = "assets/weathers/mist.png"
                break;
            case "Clear":
                props.weatherInfo['weatherCondImg'] = "assets/weathers/clear.png"
                break;    
            case "Windy":
                props.weatherInfo['weatherCondImg'] = "assets/weathers/tornado.png"
                break;   
            default:
                props.weatherInfo['weatherCondImg'] = "assets/weathers/clear.png"
                break;
        }        
    }

    
    return(

        <div>
        {(props.weatherInfo != null) ? (
            <div>
                <IonCard className="weather-bg">
                <IonCardContent class="py-50">
                    <IonGrid>
                        <IonRow className="align-items-center">
                            <IonCol className="col-12 col-lg-6">
                                <div className="container">
                                    <div className="weather-container" >
                                        <p className="txt-cityCountry">{props.weatherInfo.name}, {props.weatherInfo.sys.country}</p>
                                        <div className="d-flex flex-row align-items-center py-4">
                                            {/* <img src={'**../**public/images/weathers/cloudy.png'} height={40} width={40} /> */}
                                            <img src={props.weatherInfo.weatherCondImg} alt="" height={40} width={40}/>
                                            <p className="txt-weatherCondi">{props.weatherInfo.weather[0].main}</p>
                                        </div>
                                        <p className="txt-temp py-3">{Math.round(props.weatherInfo.main.temp)}°</p>
                                    </div>
                                    
                                </div>
                            </IonCol>
                            <IonCol className="col-12 col-lg-6">
                                <div className="container">
                                    <div className="weatherdesc-container">
                                        <div className="my-1">
                                            <p className="txt-title">Description</p>
                                            <p className="txt-result">{props.weatherInfo.weather[0].description}</p>
                                        </div>

                                        <div className="my-1">
                                            <p className="txt-title">Temperature</p>
                                            <p className="txt-result">{props.weatherInfo.main.temp_min}°C ~ {props.weatherInfo.main.temp_max}°C</p>
                                        </div>

                                        <div className="my-1">
                                            <p className="txt-title">Humidity</p>
                                            <p className="txt-result">{props.weatherInfo.main.humidity}%</p>
                                        </div>

                                        <div className="my-1">
                                            <p className="txt-title">Time</p>
                                            <p className="txt-result">{props.weatherInfo.dateTime}</p>
                                        </div>
                                  
                                    </div>
                                    
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
                </IonCard>
            </div>
        ) : 
        (
            <IonCard>
            <IonCardContent class="p-0 m-5">
                <IonGrid>
                    <IonRow>
                        <IonCol className="col-12">
                            <div className="container">
                                <div className="weather-container text-center">
                                    <img src="assets/errors/noData.png" height={200} width={200} />
                                    <div className="txt-noData">There is no weather to display</div>
                                    <div className="txt-noDataInfo">Please key-in the correct city and country inorder to get the weather.</div>
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
}

export default WeatherUIComponent
