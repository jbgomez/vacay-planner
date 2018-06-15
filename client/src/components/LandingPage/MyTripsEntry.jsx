import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';

const MyTripsEntry = (props) => {
  return (
    <div>
      <Segment.Group>
        <Segment padded color='blue'><Header as='h5'>{props.trip.tripName}</Header></Segment>
        <Segment.Group horizontal>
          <Segment secondary onClick={props.editTrip()}>Edit</Segment>
          <Segment secondary><Icon name='share'/>Share</Segment>
          <Segment secondary>All Trips</Segment>
        </Segment.Group>
      </Segment.Group>
    </div>
  );
}

export default MyTripsEntry;