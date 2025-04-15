import { useEffect, useState } from 'react';
import './App.css'
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

function App() {
  //activities is an array of objects
  //setActivities is a function that updates the activities array
  //useState is a hook that initializes the activities array with an empty array
  //useEffect is a hook that fetches data from the API
  //and returns the activities array and the setActivities function
const [activities, setActivities] = useState<Activity[]>([]);
  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))

      return () => {}
  }, [])

  return (
    <>
      <Typography variant='h3' >ActivityHub</Typography>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText> {activity.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default App
