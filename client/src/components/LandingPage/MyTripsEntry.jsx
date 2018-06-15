import React from 'react';
import { Header, Button, Segment } from 'semantic-ui-react';

const MyTripsEntry = (props) => {
  console.log('trip', trip);
  return (
    <div>
      <Segment className="landing-card" padded color='blue'><Header as='h5'>{props.trip.tripName}</Header>
      </Segment>
      <Button.Group>
        <Button onClick={(e) => props.editTrip(props.trip, e)}>Edit</Button>
        <Button>Share</Button>
        <Button>All Trips</Button>
      </Button.Group>
    </div>
  );
}

export default MyTripsEntry;