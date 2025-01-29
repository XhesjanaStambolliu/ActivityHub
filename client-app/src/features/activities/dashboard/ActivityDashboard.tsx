import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/layout/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

//Props eshte nje objekt qe permban te gjitha te dhenat qe mund te dergohen nga nje komponent tek nje komponent tjeter
interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void; //funksion qe merr nje string si parameter dhe nuk kthen asgje
    cancelSelectActivity: () => void; //funksion qe nuk merr asnje parameter dhe nuk kthen asgje
    editMode: boolean;
    openForm: (id?: string) => void; //funksion qe merr nje string si parameter dhe nuk kthen asgje
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void; //funksion qe merr nje objekt i tipit Activity si parameter dhe nuk kthen asgje
    deleteActivity: (id: string) => void;
}

//Props: Props eshte nje funksion qe merr nje objekt Props dhe kthen nje JSX
export default function ActivityDashboard({ activities, selectActivity, selectedActivity,
    cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, deleteActivity }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity} 
                />
            </Grid.Column>

            <Grid.Column width='6'>
                {selectedActivity && !editMode && //nese selectedActivity eshte true atehere shfaq ActivityDetails
                    <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm} />}

                {editMode && //nese editMode eshte true atehere shfaq ActivityForm
                    <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
}