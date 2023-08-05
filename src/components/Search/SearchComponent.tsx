import "./SearchComponent.css";
import {
  IonCol,
  IonAlert,
  IonGrid,
  IonIcon,
  IonRow,
  IonButton,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import { businessOutline, earthOutline } from "ionicons/icons";
import React, { useState } from "react";

interface ContainerProps {
  onSaveWeatherData: (arg0: { city: string; country: string }) => void;
}

const SearchComponent: React.FC<ContainerProps> = (props) => {
  // Form Control
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // Alert Show on / off
  const [showAlert1, setShowAlert1] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  //User Object Key & Value

  const inputHandler = (value: string, type: string) => {
    switch (type) {
      case "city":
        setCity(value);
        break;
      case "country":
        setCountry(value.toUpperCase());
        break;
      default:
        setAlertMsg("Currently do not have this input control.");
        setShowAlert1(true);
        break;
    }
  };

  const clearAll = () => {
    setCity("");
    setCountry("");
  };

  const submitHandler = (event: any) => {
    event.preventDefault();
    if (city == "") {
      setAlertMsg("City not yet filled.");
      setShowAlert1(true);
      return;
    }

    if (country == "") {
      setAlertMsg("Country not yet filled.");
      setShowAlert1(true);
      return;
    }

    const userData = {
      city: city,
      country: country,
    };
    props.onSaveWeatherData(userData);
    clearAll();
  };

  return (
    <div>
      <IonCard>
        <IonCardContent>
          <form onSubmit={submitHandler}>
            <IonGrid>
              <IonRow>
                <IonCol className="col-12 col-md-4">
                  <div className="search-container">
                    <IonIcon
                      className="icon"
                      color="medium"
                      icon={businessOutline}
                    />
                    <input
                      type="text"
                      placeholder="City"
                      onChange={(e) => {
                        inputHandler(e.target.value.replace(/^\s/, ""), "city");
                      }}
                      value={city}
                    />
                  </div>
                </IonCol>
                <IonCol className="col-12 col-md-4">
                  <div className="search-container">
                    <IonIcon
                      className="icon"
                      color="medium"
                      icon={earthOutline}
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      onChange={(e) => {
                        inputHandler(
                          e.target.value.replace(/^\s/, ""),
                          "country"
                        );
                      }}
                      value={country}
                    />
                  </div>
                </IonCol>
                <IonCol className="col-12 col-lg-4">
                  <div className="action-container">
                    <IonButton color="tertiary" type="submit">
                      Search
                    </IonButton>
                    <IonButton disabled={!city && !country} color="danger"  onClick={clearAll}>
                      Clear
                    </IonButton>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </form>
        </IonCardContent>
      </IonCard>

      <IonAlert
        isOpen={showAlert1}
        onDidDismiss={() => setShowAlert1(false)}
        cssClass="default-alert"
        header={"Alert"}
        message={alertMsg}
        buttons={["OK"]}
      />
    </div>
  );
};

export default SearchComponent;
