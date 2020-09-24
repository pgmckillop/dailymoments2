import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../auth';
import { firestore } from '../firebase';

const AddEntryPage: React.FC = () => {
  const history = useHistory();
  const { userId } = useAuth();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [pictureUrl, setPictureUrl] = useState('/assets/placeholder.png');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const pictureUrl = URL.createObjectURL(file);
      console.log('file: ', pictureUrl);
      setPictureUrl(pictureUrl);
    }
  };

  const handleSave = async () => {
    const entriesRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries');
    const entryData = { date, title, description };
    const entryRef = await entriesRef.add(entryData);
    console.log('saved: ', entryRef.id);
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonDatetime
              value={date}
              onIonChange={(event) => setDate(event.detail.value)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput
              value={title}
              onIonChange={(event) => setTitle(event.detail.value)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Picture</IonLabel>
            <br />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <img src={pictureUrl} alt="" />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea
              value={description}
              onIonChange={(event) => setDescription(event.detail.value)}
            />
          </IonItem>

          <IonButton expand="block" onClick={handleSave}>
            Save
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
