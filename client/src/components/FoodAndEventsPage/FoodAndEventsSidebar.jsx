import React from 'react';
import { Popup, Dropdown, Button, Card, Input, Tab, Item, List } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import CreateTripModal from './CreateTripModal';

import FavFoodCard from './FavFoodCard.jsx';
import FavEventCard from './FavEventCard.jsx';

class FoodAndEventsSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      value: null,
    };
    this.saveAndUpdateTripData = this.saveAndUpdateTripData.bind(this);
    this.setValue = this.setValue.bind(this);
  }


  componentDidUpdate() {
    if (this.props.trips.length !== this.state.options.length) {
      var trips = this.props.trips.map((trip) => {
        return {
          key: trip.id,
          value: trip.id,
          text: trip.tripName,
        };
      });
      this.setState({
        options: trips,
      });
    };
  }

  setValue(e, data) {
    this.setState({ value: data.value });
  }

  saveAndUpdateTripData(tripName) {
    this.props.handleNameChange(tripName);
    this.props.saveTrip(tripName);
  }

  render() {
    const panes = [
      {
        menuItem: 'Favorites', render: () => (
          <Tab.Pane>
            {(this.props.user && this.state.options.length)  ?
              <Dropdown placeholder='Select Trip' name='default' fluid search selection onChange={this.setValue} options={this.state.options}/>
              : null}
            {(this.props.user) ?
              <CreateTripModal user={this.props.user} saveAndUpdateTripData={ (tripName) => {this.saveAndUpdateTripData(tripName)}}/>
                : null}
            <br /><br />
            {this.props.foodFavorites.length > 0 ? <h2>Restaurants</h2> : ''}
            <List celled size='large'>
              {this.props.foodFavorites.map((restaurant, index) => {
                return <FavFoodCard restaurant={restaurant} key={'favfood' + restaurant.id} />;
              })}
            </List>
            {this.props.eventFavorites.length > 0 ? <h2>Events</h2> : ''}
            <List celled size='large'>
              {this.props.eventFavorites.map((event, index) => {
                return <FavEventCard event={event} key={'favevent' + event.id} />;
              })}
            </List>
            {(this.props.foodFavorites.length + this.props.eventFavorites.length === 0) ? '' :
              (this.props.user) ?
                (<Button onClick={(this.props.user) ? ( () => this.props.updateTrip(this.state.value) ) : null} content='Save My Trip'
                                   fluid />) :
                (<div>
                  <Button onClick={() => {this.props.history.push('/login')}} color='blue' fluid content='Login to Save' />
                  <hr />
                  <Button onClick={() => {this.props.history.push('/signup')}} fluid content='Not a member? Sign Up' />
                </div>)
            }
          </Tab.Pane>
        )
      }
    ];
    return (<Tab panes={panes} />);
  }
}

export default withRouter(FoodAndEventsSidebar);

