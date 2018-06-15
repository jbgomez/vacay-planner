import React from 'react';
import { Header, Button, Segment } from 'semantic-ui-react';

const MyTripsEntry = (props) => {
  return (
    <div>
      <Segment className="landing-card" padded color='blue'><Header as='h5'>{props.trip.tripName}</Header>
      </Segment>
      <Button.Group>
        <Button onClick={(e) => props.handleEditTrip(props, e)}>Edit</Button>
        <Button>Share</Button>
        <Button>All Trips</Button>
      </Button.Group>
    </div>
  );
}

export default MyTripsEntry;