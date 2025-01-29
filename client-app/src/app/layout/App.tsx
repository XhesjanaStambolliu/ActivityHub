import {useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from './models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid'; //uuid eshte nje librar qe gjeneron id te unike

function App() {
  //activities variabel qe ruan nje array, 
  //setActivities funksion qe perdoret per te ndryshuar kete state, state do te permbaj te dhenat qe do te marrim nga API
  const [activities, setActivities] = useState<Activity[]>([]); //inicializimi i state te quajtur activities me nje array bosh
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined); //inicializimi i state te quajtur selectedActivity me undefined
  const [editMode, setEditMode] = useState(false); //inicializimi i state te quajtur editMode me false

  //useEffect eshte nje efekt anesor pasi komponenti te jete i ngarkuar ne DOM
  //axios.get eshte nje metode qe ben nje kerkese GET ne server dhe merr te dhenat qe kthehen nga serveri
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data);
      })
  }, [])

  //funksioni handleSelectActivity merr nje id si parameter dhe e kthen aktivitetin qe ka ate id (selectedActivity)
  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  //funksioni handleCancelSelectActivity nuk merr asnje parameter dhe e kthen aktivitetin e selektuar ne undefined
  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  //funksioni handleFormOpen nuk merr asnje parameter dhe e kthen editMode ne true
  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : setSelectedActivity(undefined);
    setEditMode(true);
    //setSelectedActivity(undefined); //nese nuk ka id atehere selectedActivity eshte undefined
  }

  //funksioni handleFormClose nuk merr asnje parameter dhe e kthen editMode ne false
  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id  //nese activity ka id atehere perditeso aktivitetin qe ka ate id
    ? setActivities([...activities.filter(x => x.id !== activity.id), activity])  //perditeso aktivitetin qe ka ate id
    : setActivities([...activities, {...activity, id: uuid()}]); //shto aktivitetin e ri ne array, uuid() gjeneron nje id te ri
    setEditMode(false); //editMode behet false
    setSelectedActivity(activity); //aktiviteti i selektuar eshte aktiviteti qe sapo kemi krijuar ose edituar
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)]); //i bene remove nga lista aktivitetin qe ka ate id
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={activities} //ActivityDashboard eshte nje komponent qe merr disa props
          selectedActivity={selectedActivity} //selectedActivity eshte nje objekt i tipit Activity ose undefined
          selectActivity={handleSelectActivity} //selectActivity eshte nje funksion qe merr nje id si parameter dhe e kthen aktivitetin qe ka ate id
          cancelSelectActivity={handleCancelSelectActivity}  //cancelSelectActivity eshte nje funksion qe nuk merr asnje parameter dhe e kthen aktivitetin e selektuar ne undefined

          editMode={editMode} //editMode eshte nje boolean qe tregon nese jemi ne edit mode apo jo
          openForm={handleFormOpen} //openForm eshte nje funksion qe nuk merr asnje parameter dhe e kthen editMode ne true
          closeForm={handleFormClose} //closeForm eshte nje funksion qe nuk merr asnje parameter dhe e kthen editMode ne false
          createOrEdit ={handleCreateOrEditActivity} //handleCreateOrEditActivity eshte nje funksion qe merr nje objekt i tipit Activity si parameter dhe nuk kthen asgje
          deleteActivity={handleDeleteActivity} //deleteActivity eshte nje funksion qe merr nje string si parameter dhe nuk kthen asgje
       />
      </Container>
    </>
  );
}

export default App
