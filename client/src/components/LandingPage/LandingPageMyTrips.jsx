import React from 'react';
import { Card, Grid, Form, Button, Segment, Header } from 'semantic-ui-react';
import MomentLocaleUtils, {formatDate, parseDate} from 'react-day-picker/moment';
import MyTripsEntry from './MyTripsEntry.jsx';

const LandingPageMyTrips = (props) => {
  return (
    <Grid.Column width={4}>
      <Card style={{height: '440px'}}>
        <Card.Content header='Upcoming Trips'/>
        <Button onClick={(e) => props.handleAllTrips(props.history, e)} size="tiny" style={{position: 'absolute', top: '0.75em', right: '0.75em', width: 'auto'}}>All Trips</Button>
        <Card.Content style={{overflowY: 'scroll'}}>
          {props.trips.map((trip, i) => {
            return(
              <MyTripsEntry
                trip={trip}
                getAllTrips={props.getAllTrips}
                handleEditTrip={props.handleEditTrip}
                handleAllTrips={props.handleAllTrips}
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
