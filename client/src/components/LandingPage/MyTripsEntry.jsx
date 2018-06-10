import React from 'react';
import { Card, Grid, Form, Button, Segment, Header } from 'semantic-ui-react';
import MomentLocaleUtils, {formatDate, parseDate} from 'react-day-picker/moment';

const MyTripsEntry = (props) => {
  return (
    <Segment stacked>
      {props.trip.tripName}
      <br/>
    </Segment>
  );
}

export default MyTripsEntry;