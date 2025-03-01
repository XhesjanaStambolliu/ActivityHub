import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/layout/models/activity";
import { useState, ChangeEvent } from "react";

interface Props {
    activity: Activity | undefined;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
}

export default function ActivityForm({ activity: selectedActivity, closeForm, createOrEdit }: Props) { //selectedActivity eshte nje objekt i tipit Activity ose undefined
    const initialState = selectedActivity ?? {  //initialState eshte nje objekt i tipit Activity
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState); //inicializimi i state te quajtur activity me initialState

    function handleSubmit() {
        createOrEdit(activity); //thirr funksionin createOrEdit dhe dergo aktivitetin si parameter
        console.log(activity);
    }

    //funksioni handleInputChange merr nje event si parameter dhe e ndryshon state-in activity
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target; //destrukturojme name dhe value nga event.target
        setActivity({ ...activity, [name]: value }); 
    }

    /* setActivity({...activity, // mbaj te gjitha vlerat ekzistuese
            title: "Testing" // perditeso vetem titullin
    }); */

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button positive type='submit' floated="right" content='Submit' />
                <Button onClick={closeForm} type='button' floated="right" content='Cancel' />
            </Form>
        </Segment>
    )
}