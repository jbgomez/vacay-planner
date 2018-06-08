import React from 'react';
import Proptypes from 'prop-types';
import moment from 'moment';
import { Grid, Accordion, Icon } from 'semantic-ui-react';
import SelectTrip from './SelectTrip.jsx';
import EventsList from './EventsList.jsx';
import RestaurantsList from './RestaurantsList.jsx';
import $ from 'jquery';

class MyTripsPageBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrip: 1,
      allTrips: [],
      eventsSelected: [],
      restaurantsSelected: [],
      activeIndex: null
    }
    this.updateSelection = this.updateSelection.bind(this);
  }
  
  componentDidMount() {
    this.getAllTrips();
    this.updateSelection(this.state.selectedTrip);
  }

  handleClick(e, titleProps) {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ 
      activeIndex: newIndex 
    })
    this.updateSelection(this.state.selectedTrip)
  }

  updateSelection(tripId) {
    this.setState(() => {
      return {
        selectedTrip: tripId
      }
    })
    this.getTripDetailsById(tripId);
  }

  getTripDetailsById(tripId) {
    $.ajax({
      type: 'GET',
      url: `/trips/${tripId}`,
      success: result => {
        this.setState({
          eventsSelected: JSON.parse(result).events,
          restaurantsSelected: JSON.parse(result).restaurants
        })
      }
    })
  }

  handleDelete(restaurant) {
    var data = {
      tripId: restaurant.tripId,
      tripItemId: restaurant.id,
    }
    $.ajax({
      type: 'POST',
      url: `/remove`,
      data: data,
      success: () => {
        this.getAllTrips();
        this.updateSelection(this.state.selectedTrip);
      }
    });
  };

  getAllTrips() {
    $.ajax({
      type: 'GET',
      url: `/trips`,
      success: result => {
        JSON.parse(result).length ?
          (
            this.setState({
              selectedTrip: JSON.parse(result)[0].id,
              allTrips: JSON.parse(result)
            })
          )
          : ''
      }
    })
  }

  render() {
    const {activeIndex} = this.state
    return (
      <div> 
        <Grid columns='equal' style={ { marginTop: 50, backgroundColor: 'white'} }>
          <Grid.Column floated='left' width={3}>
            <SelectTrip
              selectedTrip = {this.state.selectedTrip}
              allTrips =  {this.state.allTrips}
              onSelect = {this.updateSelection}
            />
          </Grid.Column>
          {this.state.allTrips.length ?
            (
              <Grid.Column floated='right' width={13}>
                <Accordion fluid styled>
                  <Accordion.Title style={ { color: '#d0021b', fontSize: 20} } active={activeIndex === 0} index={0} onClick={this.handleClick.bind(this)}>
                    <Icon name='dropdown'/>
                    Saved Events
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 0}>
                    <p> </p>
                    {!this.state.eventsSelected.length ? <p>No Saved Events</p> : <EventsList eventsSelected={this.state.eventsSelected}/>}
                  </Accordion.Content>
                  <Accordion.Title style={ {color: '#d0021b', fontSize: 20} } active={activeIndex === 1} index={1} onClick={this.handleClick.bind(this)}>
                    <Icon name='dropdown' />
                    Saved Restaurants
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 1}>
                    <p> </p>
                    {!this.state.restaurantsSelected.length ? <p>No Saved Restaurants</p> : <RestaurantsList handleDeleteClick={this.handleDelete.bind(this)} restaurantsSelected={this.state.restaurantsSelected}/>}
                  </Accordion.Content>
                </Accordion>
              </Grid.Column>
            ) 
          : 
            (<span style={ {color: '#d0021b', fontSize: 30, align: 'center', marginRight: 450, marginTop: 50} }> No Saved Trips </span>)}
        </Grid>
      </div>
    )
  }
}

export default MyTripsPageBody;