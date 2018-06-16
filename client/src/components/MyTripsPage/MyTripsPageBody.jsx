import React from 'react';
import Proptypes from 'prop-types';
import moment from 'moment';
import { Modal, Grid, Accordion, Icon } from 'semantic-ui-react';
import SelectTrip from './SelectTrip.jsx';
import EventsList from './EventsList.jsx';
import RestaurantsList from './RestaurantsList.jsx';
import $ from 'jquery';

class MyTripsPageBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allTrips: [],
      selectedTrip: '',
      eventsSelected: [],
      restaurantsSelected: [],
      activeIndex: null
    };

    this.getSelectedTripLists = this.getSelectedTripLists.bind(this);
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: `/trips`,
      success: results => {
        results = JSON.parse(results);
        
        if (results.length) {
          this.setState({allTrips: results}, () => this.getSelectedTripLists(results[0].id));
        }
      }
    });
  }

  getSelectedTripLists(tripId) {
    $.ajax({
      type: 'GET',
      url: `/trips/${tripId}`,
      success: result => {
        this.setState({
          selectedTrip: tripId,
          eventsSelected: JSON.parse(result).events,
          restaurantsSelected: JSON.parse(result).restaurants
        })
      }
    });
  }

  handleClick(e, titleProps) {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({
      activeIndex: newIndex
    });
  }

  handleRestaurantDelete(restaurant) {
    var data = {
      tripId: restaurant.tripId,
      tripItemId: restaurant.id,
    };
    $.ajax({
      type: 'POST',
      url: `/delete/restaurant`,
      data: data,
      success: () => {
        this.setState(prevState => {
          return {
            restaurantsSelected: prevState.restaurantsSelected.filter(rest => rest.id !== restaurant.id)
          };
        });
      }
    });
  }

  handleEventDelete(event) {
    var data = {
      tripId: event.tripId,
      tripItemId: event.id,
    };
    $.ajax({
      type: 'POST',
      url: `/delete/event`,
      data: data,
      success: () => {
        this.setState(prevState => {
          return {
            eventsSelected: prevState.eventsSelected.filter(ev => ev.id !== event.id)
          };
        });
      }
    });
  }

  getAllTrips(id) {
    $.ajax({
      type: 'GET',
      url: `/trips`,
      success: result => {
        JSON.parse(result).length ?
          (
            this.setState({
              selectedTrip: id || JSON.parse(result)[0].id,
              allTrips: JSON.parse(result)
            })
          )
          : '';
      }
    });
  }

  render() {
    const {activeIndex} = this.state
    return (
      <div>
        <Modal className="ui modal">
          <i className="close icon"></i>
          <div className="header">
            Modal Title
          </div>
          <div className="content">
            <div className="description">
              Are you sure you want to remove this awesome restaurant from your trip?
            </div>
          </div>
          <div className="actions">
            <div className="ui button">Cancel</div>
            <div className="ui button">OK</div>
          </div>
        </Modal>
        <Grid columns='equal' style={ { marginTop: 50, backgroundColor: 'white'} }>
          <Grid.Column floated='left' width={3}>
            <SelectTrip
              selectedTrip = {this.state.selectedTrip}
              allTrips =  {this.state.allTrips}
              onSelect = {this.getSelectedTripLists}
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
                    {!this.state.eventsSelected.length ? <p>No Saved Events</p> : <EventsList handleDeleteClick={this.handleEventDelete.bind(this)} eventsSelected={this.state.eventsSelected}/>}
                  </Accordion.Content>
                  <Accordion.Title style={ {color: '#d0021b', fontSize: 20} } active={activeIndex === 1} index={1} onClick={this.handleClick.bind(this)}>
                    <Icon name='dropdown' />
                    Saved Restaurants
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 1}>
                    <p> </p>
                    {!this.state.restaurantsSelected.length ? <p>No Saved Restaurants</p> : <RestaurantsList handleDeleteClick={this.handleRestaurantDelete.bind(this)} restaurantsSelected={this.state.restaurantsSelected}/>}
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