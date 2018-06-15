import React from 'react';
import SaveButton from '../Buttons/SaveButton.jsx';
import { Button, Card, Image, Icon, Item, Grid, Segment, Dimmer, Loader } from 'semantic-ui-react';
import SortButton from '../Buttons/SortButton.jsx';
import FilterRestaurantButton from '../Buttons/FilterRestaurantButton.jsx';

const FoodTabContent = (props) => (
  <div>
    <Grid>
      <Grid.Row>
        <Grid.Column floated="left" textAlign="left" width={5}>
          <Button.Group>
            <Button icon='list layout' active={props.restaurantListViewActive} onClick={props.showRestaurantListView} />
            <Button icon='map' active={!props.restaurantListViewActive} onClick={props.showRestaurantMapView} />
          </Button.Group>
        </Grid.Column>
        <Grid.Column floated="right" textAlign="right" width={5}>
          <FilterRestaurantButton filterRestaurants={props.filterRestaurants}/>
          <SortButton sortList={props.sortRestaurantList} onSort={props.onRestaurantSort}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <div id="restaurant-map-view" className={'map-view' + (props.restaurantListViewActive ? ' hide-view' : '')}></div>
    <div className={'list-view' + (!props.restaurantListViewActive ? ' hide-view' : '')}>
      {props.restaurantList.length
        ? (props.restaurantList.map((restaurant, index) => {
            return (
                <Card fluid key={restaurant.id}>
                  <Item.Group data-rest-wrapper-id={index}>
                    <Item data-rest-id={index} className="list-item">
                      <Item.Image className='restaurant-image'
                        size='small'
                        src={restaurant.image_url}
                        style={{ margin: 15 }}
                      />
                      <Item.Content>
                        <Item.Header style={{ marginTop: 20 }} className='restaurant-name'>{`${index + 1}. ${restaurant.name}`}</Item.Header>
                        <Item.Image>
                          <span className='restaurant-rating'>
                            <Image
                              src={`/media/yelp_stars/regular_${(restaurant.rating).toString().replace('.5', '_half')}.png`}
                            />
                          </span>
                          <span style={{ marginLeft: 5 }} > {restaurant.review_count} reviews</span>
                        </Item.Image>
                        <Item.Description>
                          {restaurant.location.display_address.map(address => {
                            return address
                          }).join(', ')}
                        </Item.Description>
                        <Item.Extra>
                          {restaurant.price ?
                            (<span>{restaurant.price}</span>) : '---'
                          }
                          <span style={{ paddingLeft: 5 }}>{` ● `}</span>
                          <Icon name='food' fitted style={{ paddingLeft: 10 }} /> {restaurant.categories.map(category => {
                            return category.title
                          }).join(', ')}
                          <SaveButton
                            toggleFavorite={() => props.toggleFavorite(index, 'food')}
                            isSaved={props.foodFavorites.find(foodfav => foodfav.id === restaurant.id) ? true : false}
                          />
                        </Item.Extra>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Card>
            )
          }))
        : <Grid>
            <Grid.Row>
              <Grid.Column>
                <Segment style={{height: '25em'}}>
                  <Dimmer active inverted>
                    <Loader size='large'>Loading</Loader>
                  </Dimmer>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
      }
    </div>
  </div>
);

export default FoodTabContent;

