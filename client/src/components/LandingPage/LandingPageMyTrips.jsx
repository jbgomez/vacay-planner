import React from 'react';
import { Card, Grid, Form, Button, Segment, Header } from 'semantic-ui-react';
import MomentLocaleUtils, {formatDate, parseDate} from 'react-day-picker/moment';

const LandingPageMyTrips = (props) => {
  return (
    <Grid verticalAlign='middle' style={ {marginTop: 50} }>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450}}>
          <Card centered fluid>
            <Card.Content header='Upcoming Trips'/>
            <Card.Content extra>
              <Segment stacked>
                {this.}<br />
                <br /><br />
              </Segment>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default LandingPageMyTrips;