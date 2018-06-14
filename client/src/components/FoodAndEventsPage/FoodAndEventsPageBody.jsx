import React from 'react';
import FoodTabContent from './FoodTabContent.jsx';
import EventsTabContent from './EventsTabContent.jsx';
import FoodAndEventsSidebar from './FoodAndEventsSidebar.jsx';
import { Button, Tab, Grid } from 'semantic-ui-react';
import $ from 'jquery';


class FoodAndEventsPageBody extends React.Component {

  render() {
    const panes = [
      {
        menuItem: 'Restaurants', render: () =>
          <Tab.Pane>
            <FoodTabContent
              restaurantList={this.props.restaurantList}
              toggleFavorite={this.props.toggleFavorite}
              foodFavorites={this.props.foodFavorites}
              sortRestaurantList={this.props.sortRestaurantList}
              onRestaurantSort={this.props.onRestaurantSort}
              filterRestaurants={this.props.filterRestaurants}
              />
          </Tab.Pane>
      },
      {
        menuItem: 'Events', render: () => (
          <Tab.Pane>
            {this.props.eventsList.length
              ? (<EventsTabContent
                    eventsList={this.props.eventsList}
                    toggleFavorite={this.props.toggleFavorite}
                    eventFavorites={this.props.eventFavorites}
                    sortEventList={this.props.sortEventList}
                    onEventSort={this.props.onEventSort}
                    filterEvents={this.props.filterEvents}
                  />)
              : <h2 style={{color: '#d0021b', textAlign: 'center'}}>No events found.</h2>
            }
          </Tab.Pane>
        )
      }
    ]
    return (
      <div>
        <Tab panes={panes} />

      </div>
    );
  }
}

export default FoodAndEventsPageBody;
