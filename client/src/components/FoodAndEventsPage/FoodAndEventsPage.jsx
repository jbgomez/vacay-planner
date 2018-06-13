import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import FoodAndEventsPageBody from './FoodAndEventsPageBody.jsx';
import FoodAndEventsSidebar from './FoodAndEventsSidebar.jsx';
import { Tab, Grid } from 'semantic-ui-react';
import $ from 'jquery';

class FoodAndEventsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantList: [],
      eventsList: [],
      foodFavorites: [],
      eventFavorites: [],
      tripName: "",
      sortRestaurantList: [{label: 'Best Match',
                            sortBy: 'best_match'},
                            {label: 'Ratings',
                            sortBy: 'rating'},
                            {label: 'Review',
                            sortBy: 'review_count'}],
      sortEventList: [{label: 'Date',
                      sortBy: 'date,desc'},
                      {label: 'Name',
                      sortBy: 'name,asc'},
                      {label: 'Relevance',
                      sortBy: 'relevance,desc'}]
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.saveTrip = this.saveTrip.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.onRestaurantSort = this.onRestaurantSort.bind(this);
    this.onEventSort = this.onEventSort.bind(this);
    this.filterRestaurants = this.filterRestaurants.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
  }

  toggleFavorite(listIndex, listName) {
    if (listName === 'food') {
      let selectedFood = this.state.restaurantList[listIndex];
      let newFoodFavorites = this.state.foodFavorites.filter(foodfav => foodfav.id !== selectedFood.id);
      if (newFoodFavorites.length === this.state.foodFavorites.length) {
        newFoodFavorites.push(this.state.restaurantList[listIndex]);
      }
      this.setState({ foodFavorites: newFoodFavorites });
    } else {
      let selectedEvent = this.state.eventsList[listIndex];
      let newEventFavorites = this.state.eventFavorites.filter(eventfav => eventfav.id !== selectedEvent.id);
      if (newEventFavorites.length === this.state.eventFavorites.length) {
        newEventFavorites.push(this.state.eventsList[listIndex]);
      }
      this.setState({ eventFavorites: newEventFavorites });
    }
  }

  handleNameChange(event) {
    this.setState({tripName: event.target.value});
  }

  saveTrip() {
    var data = {
      user: {email: 'ted.green@test.com'},
      trip: {
        start_date: this.props.startDate,
        end_date: this.props.endDate,
        name: this.state.tripName
      },
      eventList: this.state.eventFavorites,
      restaurantList: this.state.foodFavorites
    };
    $.ajax({
      method: 'POST',
      url: '/trips',
      data: data,
      success: (data) => {
        console.log(data);
      },
      error: (err) => {console.log(err)},
      dataType: 'json'
    })
    this.setState({
      foodFavorites: [],
      eventFavorites: [],
      tripName: ""
    });
  }

  componentDidMount() {
    this.getRestaurantsByLocation();
    this.getEventsByLocationAndDate();
  }

  getRestaurantsByLocation(sortBy) {
    $.ajax({
      type: 'GET',
      url: '/restaurants',
      data: {
        sortBy: sortBy || 'best_match',
        location: this.props.latLng
      },
      dataType: 'json',
      success: result => {
        this.setState({
          restaurantList: result.businesses
        });
      }
    });
  }

  filterRestaurants(criteria) {
    $.ajax({
      type: 'GET',
      url: '/restaurants',
      data: {
        price: criteria.price,
        location: this.props.latLng,
        open_now: criteria.open_now
      },
      dataType: 'json',
      success: result => {
        this.setState({
          restaurantList: result.businesses
        });
      }
    });
  }

  getEventsByLocationAndDate(sortCriteria) {
    $.ajax({
      type: 'GET',
      url: `/events`,
      data: {
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        location: this.props.addressComponents,
        sort: sortCriteria || 'date,asc'
      },
      dataType: 'json',
      success: result => {
        if (result) {
          this.setState({
            eventsList: result
          });
        }
      }
    });
  }

  filterEvents(criteria) {
    $.ajax({
      type: 'GET',
      url: `/events`,
      data: {
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        location: this.props.addressComponents,
        source: criteria.source,
        includeFamily: criteria.includeFamily
      },
      dataType: 'json',
      success: result => {
        if (result) {
          this.setState({
            eventsList: result
          });
        }
      }
    });
  }

  onRestaurantSort(sortByCriteria){
    this.getRestaurantsByLocation(sortByCriteria);
  }

  onEventSort(sortByCriteria){
    this.getEventsByLocationAndDate(sortByCriteria);
  }

  render() {
    return (
      //Column width must add up to 16
      <Grid style={ {marginTop: 50} }>
        <Grid.Row>
          <Grid.Column floated="right">
            <NavBar
            user={this.props.user} handleLogout={this.props.handleLogout}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={10}>
            <FoodAndEventsPageBody
              restaurantList={this.state.restaurantList}
              eventsList={this.state.eventsList}
              foodFavorites={this.state.foodFavorites}
              eventFavorites={this.state.eventFavorites}
              toggleFavorite={this.toggleFavorite}
              sortRestaurantList={this.state.sortRestaurantList}
              onRestaurantSort={this.onRestaurantSort}
              sortEventList={this.state.sortEventList}
              onEventSort={this.onEventSort}
              filterRestaurants={this.filterRestaurants}
              filterEvents={this.filterEvents}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <FoodAndEventsSidebar
              user={this.props.user}
              foodFavorites={this.state.foodFavorites}
              eventFavorites={this.state.eventFavorites}
              saveTrip={this.saveTrip}
              tripName={this.state.tripName}
              onNameChange={this.handleNameChange}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
};

export default FoodAndEventsPage;