import React from 'react';
import { Header, Button, Segment } from 'semantic-ui-react';

const MyTripsEntry = (props) => {
  return (
    <div>
      <Segment className="landing-card" padded color='blue'>
        <Header as='h5'>{props.trip.tripName}</Header>
        <Button onClick={(e) => props.handleEditTrip(props, e)} size="small" style={{display: 'block', margin: 'auto'}}>Edit</Button>
      </Segment>
    </div>
  );
}

export default MyTripsEntry;