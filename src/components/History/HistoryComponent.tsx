import "./HistoryComponent.css";
import MainComponent from '../Main/MainComponent';
import React, { useState } from "react";
import moment, { Moment } from 'moment-timezone'
import {
  IonCol,
  IonIcon,
  IonGrid,
  IonRow,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonToast
} from "@ionic/react";
import { searchOutline, trashOutline } from "ionicons/icons";
interface ContainerProps {
  historyData: any;
  onSearchWeatherData : any
}

const HistoryComponent: React.FC<ContainerProps> = (props) => {
  // History list get from localStorage
  const [showToast, setShowToast] = useState(false);
  const [showToastMsg, setToastMsg] = useState("");
  const [history, setHistory] = useState([
    {
      id: 1,
      city: "London",
      country: "GB",
      dateTime: moment(new Date()).format('h:mm a'),
    },
    {
      id: 2,
      city: "Singapore",
      country: "SG",
      dateTime: moment(new Date()).format('h:mm a'),
    },
    {
      id: 3,
      city: "Johor",
      country: "MY",
      dateTime: moment(new Date()).format('h:mm a'),
    },
    {
      id: 4,
      city: "Australia",
      country: "AU",
      dateTime: moment(new Date()).format('h:mm a'),
    }
  ]);


  // if(props.historyData.length != 0){
  //   setHistory(history.concat([{id: 5, city: 'London', country: 'GB', dateTime: '5:55 pm'}]));
  // }



  
  console.log("props.historyData", props.historyData);
  console.log("history", history);

  const searchWeather = (data) => {
    const searchData = {
      city: data.city,
      country: data.country,
    }

    props.onSearchWeatherData(searchData)

  };

  const deleteHistory = (removeData) => {
    
    console.log("removeData", removeData);
    let filteredData = history.filter(data => data.id != removeData.id);
    console.log('filteredData',filteredData);
    setHistory(filteredData);
    console.log('history',history);
    setToastMsg("Removed successfully");
    setShowToast(true);
  };

  return (
    <div>
      {history.length > 0 ? (
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol className="col-12">
                  <div className="txt-historyTitle">Search History</div>
                  <IonList>
                    {history.map((data, index) => (
                      <IonItem className="itemBox">
                        <IonLabel className="txt-countrycity">
                          {data.city}, {data.country}
                        </IonLabel>
                        <div className="txt-time" slot="end">
                          {data.dateTime}
                        </div>
                        <div className="icon-div" slot="end">
                          <IonIcon
                            className="icon"
                            color="medium"
                            onClick={() => searchWeather(data)}
                            icon={searchOutline}
                          />
                          <IonIcon
                            className="icon"
                            color="medium"
                            onClick={() => deleteHistory(data)}
                            icon={trashOutline}
                          />
                        </div>
                      </IonItem>
                    ))}
                  </IonList>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      ) : (
        <IonCard>
          <IonCardContent class="py-50">
            <IonGrid>
              <IonRow>
                <IonCol className="col-12">
                  <div className="container history-container text-center">
                    <img src="assets/errors/noHistory.png" height={150} width={150} />
                    <div className="txt-noData">History is empty</div>
                    <div className="txt-noDataInfo">
                      Data will store automatically. Once the valid city and
                      country was searched
                    </div>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      )}

      <IonToast
        isOpen={showToast}
        duration = {2000}
        message={showToastMsg}
        position="bottom"
      />


    </div>
  );
};

export default HistoryComponent ;
