import "./HistoryComponent.css";
import React, { useEffect, useState, useReducer } from "react";
import PipeService from "../../pipes/pipe.service";
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
  IonToast,
} from "@ionic/react";
import { searchOutline, trashOutline } from "ionicons/icons";

type MyType = {
  id: number;
  city: string;
  country: string;
  dateTime: string;
};

interface ContainerProps {
  historyDatas: Array<MyType>;
  onSearchWeatherData: any;
}

const emailReducer = (state,action) => {
  return {value : '', valid : false};
};

const HistoryComponent: React.FC<ContainerProps> = (props) => {
  // History list get from localStorage
  const [showToast, setShowToast] = useState(false);
  const [showToastMsg, setToastMsg] = useState("");
  const [history, setHistory] = useState([
    {
      id: 1,
      city: "London",
      country: "GB",
      dateTime: PipeService.convertDateTimeWithType("time"),
    },
    {
      id: 2,
      city: "Singapore",
      country: "SG",
      dateTime: PipeService.convertDateTimeWithType("time"),
    },
    {
      id: 3,
      city: "Johor",
      country: "MY",
      dateTime: PipeService.convertDateTimeWithType("time"),
    },
    {
      id: 4,
      city: "Australia",
      country: "AU",
      dateTime: PipeService.convertDateTimeWithType("time"),
    },
  ]);

  const [enteredEmail, setEmail] = useState(""); 
  const [enteredValidEmail, setValidEmail] = useState(""); 

  const [emailState,dispatchEmail] = useReducer(emailReducer,{value : '', valid : false});

  useEffect(() => {
    combineHistoryData();
  }, [props]);



  const combineHistoryData = () => {
    var arraybf = history.concat(props.historyDatas);

    arraybf.map((res, index) => {
      res["id"] = index + 1;
      res["city"] = PipeService.setCapitialize(res.city);
      return res;
    });

    setHistory(arraybf);
  };

  const searchWeather = (data) => {
    const searchData = {
      city: data.city,
      country: data.country,
    };

    props.onSearchWeatherData(searchData);
  };

  const deleteHistory = (removeData) => {
    let filteredData = history.filter((data) => data.id != removeData.id);
    setHistory(filteredData);
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
                    {history.map((data,index) => (
                      <IonItem className="itemBox" key={index}>
                        <IonLabel className="txt-countrycity">
                          {data.city}, {data.country}
                        </IonLabel>
                        <div className="txt-time" slot="end">
                          {data.dateTime}
                        </div>
                        <div className="icon-div" slot="end">
                          <IonIcon
                            className="icon"
                            color="primary"
                            onClick={() => searchWeather(data)}
                            icon={searchOutline}
                          />
                          <IonIcon
                            className="icon"
                            color="danger"
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
                    <img
                      src="assets/errors/noHistory.png"
                      height={150}
                      width={150}
                    />
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
        onDidDismiss={() => setShowToast(false)}
        duration={2000}
        message={showToastMsg}
        position="bottom"
      />
    </div>
  );
};

export default HistoryComponent;
