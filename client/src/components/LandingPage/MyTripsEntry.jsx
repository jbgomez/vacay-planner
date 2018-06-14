import React from 'react';
import { Grid, Card, Icon, Divider, Segment } from 'semantic-ui-react';
import MomentLocaleUtils, {formatDate, parseDate} from 'react-day-picker/moment';

const MyTripsEntry = (props) => {
  return (
    <div>
      <Grid.row>{props.trip.tripName}</Grid.row>
      <Grid columns={3} relaxed>
        <Grid.Column>
          <Segment basic>Edit</Segment>
        </Grid.Column>
        <Divider vertical>Or</Divider>
        <Grid.Column>
          <Segment basic><Icon name='share'/>Share</Segment>
        </Grid.Column>
        <Divider vertical>And</Divider>
        <Grid.Column>
          <Segment basic>All Trips</Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default MyTripsEntry;