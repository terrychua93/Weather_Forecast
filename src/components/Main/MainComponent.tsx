import SearchComponent from '../Search/SearchComponent';
import './MainComponent.css';
import WeatherService from '../../services/weather.service'
import WeatherUIComponent from '../WeatherUI/WeatherUIComponent';
import React, { useState, useEffect } from "react";
import HistoryComponent from '../History/HistoryComponent';
import { IonAlert, IonLoading } from '@ionic/react';
import moment, { Moment } from 'moment-timezone'
import countytz from 'countries-and-timezones'
interface ContainerProps { }

const MainComponent: React.FC<ContainerProps> = () => {
  const [weatherInfo, setWeatherInfo] = useState(undefined);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [historyData, storeHistory] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  const addHistoryItem=(data : any) => {
    data['dateTime'] = moment(new Date()).format('h:mm a').toUpperCase();

    storeHistory([data]);
    storeHistory([]);
  }
  

  const saveWeatherDataHandler = (data : any, storeHistory?: boolean) =>{
    
    return new Promise((resolve,reject)=>{
      WeatherService.getWeatherBySearch(data).then(response => {
        if(response.cod =='404'){
          setWeatherInfo(undefined);
          setAlertMsg(response.message);
          setShowAlert(true);
  
          return;
        }
        var timeDateresult = countytz.getCountry(response.sys.country);
        response['dateTime'] = moment(new Date()).tz(timeDateresult.timezones[0]).format('D MMM YYYY, h:mm a')

        setWeatherInfo(response);
        if(storeHistory){
          addHistoryItem(data);
        }
        resolve(response);
      }).catch((error)=>{
        setWeatherInfo(undefined);
        reject(error);
      }); 
    })
   
  }

  const historySearchWeather = async (data : any) =>{
    setShowLoading(true);
    await saveWeatherDataHandler(data,false);
    setShowLoading(false);
  }


  return (
    <div className="container">
      <SearchComponent  onSaveWeatherData={(data)=> saveWeatherDataHandler(data,true)} />
      <WeatherUIComponent weatherInfo={weatherInfo}/>
      <HistoryComponent historyDatas={historyData} onSearchWeatherData={historySearchWeather}/>
      <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                cssClass="default-alert"
                header={'Alert'}
                message={alertMsg}
                buttons={['OK']}
            />

  <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        message={'Please wait...'}
        duration={5000}
      />
    </div>
  );
};

export default MainComponent;
