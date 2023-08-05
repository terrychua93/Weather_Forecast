import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MainComponent from '../components/Main/MainComponent';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader >
        <IonToolbar color="tertiary">
          <IonTitle size="small">Today's Weather</IonTitle>
        </IonToolbar>         
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" color="tertiary">Today's Weather</IonTitle>
          </IonToolbar>
        </IonHeader>
        <MainComponent />
      </IonContent>
    </IonPage>
  );
};

export default Home;
