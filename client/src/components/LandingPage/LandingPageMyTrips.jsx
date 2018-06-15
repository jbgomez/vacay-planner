import React from 'react';
import { Card, Grid, Form, Button, Segment, Header } from 'semantic-ui-react';
import MomentLocaleUtils, {formatDate, parseDate} from 'react-day-picker/moment';
import MyTripsEntry from './MyTripsEntry.jsx';

const LandingPageMyTrips = (props) => {
  return (
    <Grid.Column width={6}>
      <Card>
        <Card.Content header='Upcoming Trips'/>
        <Card.Content>
          {props.trips.map((trip, i) => {

            return(
              <MyTripsEntry
                trip={trip}
                getAllTrips={props.getAllTrips}
                handleEditTrip={props.handleEditTrip}
                key={i}
                history={props.history}
              />
            );
          })}
        </Card.Content>
      </Card>
    </Grid.Column>
  );
}

export default LandingPageMyTrips;