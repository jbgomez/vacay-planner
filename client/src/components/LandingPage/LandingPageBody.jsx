import React from 'react';
import { Card, Grid, Form, Button, Segment, Header } from 'semantic-ui-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {formatDate, parseDate} from 'react-day-picker/moment';
import LocationSearchInput from './LocationSearchInput.jsx';
import LandingPageMyTrips from './LandingPageMyTrips.jsx';

const LandingPageBody = (props) => (
  <Grid centered verticalAlign='middle' style={ {marginTop: 50} }>
    <Grid.Row centered stretched>
      {props.trips.length ?
        <LandingPageMyTrips
          trips={props.trips}
          getAllTrips={props.getAllTrips}
          handleEditTrip={props.handleEditTrip}
          handleAllTrips={props.handleAllTrips}
          history={props.history}
        />
        :
        null
      }
      <Grid.Column width={4}>
        <Card style={{height: '440px'}}>
          <Card.Content header='Vacation Planner' style={{paddingTop: '1.25em'}}/>
          <Card.Content extra>
            <Form onSubmit={() => props.handleSubmit(props.history)}>
              <Header as='h2' color='red' textAlign='center'>
                {' '}Where to?
              </Header>

              <Segment stacked>
                City, State:<br />
                <LocationSearchInput
                  address={props.address}
                  handleAddressChange={props.handleAddressChange}
                  handleAddressSelect={props.handleAddressSelect}
                />
                <br /><br />
                Start Date:<br />
                <DayPickerInput
                  onDayChange={props.handleStartDayChange}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  placeholder={`${formatDate(new Date())}`}
                  value={`${formatDate(new Date())}`}
                />
                <br /><br />
                End Date:<br />

                <DayPickerInput
                  onDayChange={props.handleEndDayChange}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  placeholder={`${formatDate(new Date(new Date().valueOf() + 60 * 60 * 24 * 1000))}`}
                  value={`${formatDate(new Date(new Date().valueOf() + 60 * 60 * 24 * 1000))}`}
                />
                <br /><br />

                <Form.Button content='Submit' fluid size='large' />
              </Segment>
            </Form>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default LandingPageBody;