import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
import { Header, List } from 'semantic-ui-react';

function App() {
  //activities variabel qe ruan nje array, 
  //setActivities funksion qe perdoret per te ndryshuar kete state, state do te permbaj te dhenat qe do te marrim nga API
  const [activities, seActivities] = useState([]); //inicializimi i state te quajtur activities me nje array bosh

  //useEffect eshte nje efekt anesor pasi komponenti te jete i ngarkuar ne DOM
  //axios.get eshte nje metode qe ben nje kerkese GET ne server dhe merr te dhenat qe kthehen nga serveri
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(response => {
        console.log(response);
        seActivities(response.data);
      })
  }, [])
  
  return (
    <div>
      <Header as='h2' icon='users' content='ActivityHub' />
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>
            {activity.title}
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App
