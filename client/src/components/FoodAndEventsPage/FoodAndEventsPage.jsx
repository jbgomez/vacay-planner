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
                      sortBy: 'relevance,desc'}],
      restaurantListViewActive: true,
      eventListViewActive: true,
      restMapLog: []
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.saveTrip = this.saveTrip.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.onRestaurantSort = this.onRestaurantSort.bind(this);
    this.onEventSort = this.onEventSort.bind(this);
    this.filterRestaurants = this.filterRestaurants.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
    this.showRestaurantMapView = this.showRestaurantMapView.bind(this);
    this.showRestaurantListView = this.showRestaurantListView.bind(this);
    this.showEventMapView = this.showEventMapView.bind(this);
    this.showEventListView = this.showEventListView.bind(this);
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

  showRestaurantMapView() {
    // if map view is not active (if list view *is* active)
    if (this.state.restaurantListViewActive) {
      // deactivate list view
      this.setState({restaurantListViewActive: false}, () => {
        // init map
        const map = new google.maps.Map(document.querySelector('#restaurant-map-view'), {
          zoom: 12,
          center: this.props.latLng
        });
        
        // init popup info window for map markers
        const infowindow = new google.maps.InfoWindow();

        // iterate through restaurant list and create markers and click event handlers
        this.state.restaurantList.forEach((rest, i) => {
          // capture inner item element from card in list view
          const node = document.querySelector(`[data-rest-id='${i}']`);

          // create marker and apply to map using lat & lng from restaurant
          const marker = new google.maps.Marker({
            position: { 
              lat: rest.coordinates.latitude,
              lng: rest.coordinates.longitude
            },
            map: map
          });

          // add click event listener
          marker.addListener('click', () => {
            // set popup info window content with captured node
            // note: this actually removes the item element from the list view in the DOM. We will return it back when the view changes back to list view.
            infowindow.setContent(node);

            // open info window
            infowindow.open(map, marker);

            // log node reference and index for returning node back to list on view change
            const nodeData = {
              node: node,
              index: i
            };

            this.setState({restMapLog: this.state.restMapLog.concat([nodeData])});
          });
        });
      });
    }
  }

  showRestaurantListView() {
    // if list view is not active (if map view *is* active)
    if (!this.state.restaurantListViewActive) {
      // iterate through log of captured item nodes from list view
      this.state.restMapLog.forEach(rest => {
        // select parent node from list view
        const wrapper = document.querySelector(`[data-rest-wrapper-id='${rest.index}']`);
        // return previously removed item node to list view
        wrapper.appendChild(rest.node);
      });

      // activate list view, reset log of borrowed DOM elements from list view
      this.setState({
        restaurantListViewActive: true,
        restMapLog: []
      });
    }
  }

  showEventMapView() {

  }

  showEventListView() {

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
              sortRestaurantList = {this.state.sortRestaurantList}
              onRestaurantSort = {this.onRestaurantSort}
              sortEventList = {this.state.sortEventList}
              onEventSort = {this.onEventSort}
              filterRestaurants = {this.filterRestaurants}
              showRestaurantMapView={this.showRestaurantMapView}
              showRestaurantListView={this.showRestaurantListView}
              restaurantListViewActive={this.state.restaurantListViewActive}
              showEventMapView={this.showEventMapView}
              showEventListView={this.showEventListView}
              eventListViewActive={this.state.eventListViewActive}
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