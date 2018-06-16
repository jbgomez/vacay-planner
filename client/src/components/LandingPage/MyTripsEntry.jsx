import React from 'react';
import { Header, Button, Segment } from 'semantic-ui-react';

const MyTripsEntry = (props) => {
  return (
    <div>
      <Segment className="landing-card" padded color='blue'><Header as='h5'>{props.trip.tripName}</Header>
        <Button.Group>
          <Button onClick={(e) => props.handleEditTrip(props, e)}>Edit</Button>
          <Button onClick={(e) => props.handleAllTrips(props.history, e)}>All Trips</Button>
        </Button.Group>
      </Segment>
    </div>
  );
}

export default MyTripsEntry;