import React from 'react';
import moment from 'moment';
import SaveButton from '../Buttons/SaveButton.jsx';
import SortButton from '../Buttons/SortButton.jsx';
import FilterButton from '../Buttons/FilterButton.jsx';
import { Button, Card, Image, Item, Label, Grid } from 'semantic-ui-react';

const EventsTabContent = (props) => (
  <div>
    <Grid style={ {marginTop: 10} }>
      <Grid.Row style={ {height: 50} }>
        <SortButton sortList = {props.sortEventList} onSort = {props.onEventSort}/>
      </Grid.Row>
    </Grid>
    {props.eventsList.map((event, index) => {
      return (
        <Card fluid key={event.id}>
          <Item.Group>
            <Item>
              <Item.Image className='event-image'
                size='small'
                src={event.images[0].url}
                style={{ margin: 15 }}
              />
              <Item.Content>
                <Item.Header style={{ marginTop: 20 }} className='event-name'>
                  {`${index + 1}. ${event.name}`}
                </Item.Header>
                <Item.Description>
                  <strong>{event._embedded.venues[0].name}</strong>
                  {`,
                  ${event._embedded.venues[0].address.line1},
                  ${event._embedded.venues[0].city.name},
                  ${event._embedded.venues[0].state.stateCode}
                  ${event._embedded.venues[0].postalCode}`
                  }
                </Item.Description>
                <Item.Extra>
                  <Label
                    style={{ textTransform: 'uppercase', backgroundColor: '#00aced', color: 'white' }}
                  >
                    {moment(event.dates.start.dateTime).format('MMM DD ddd')}
                  </Label>
                  <SaveButton
                    toggleFavorite={() => props.toggleFavorite(index, 'events')}
                    isSaved={props.eventFavorites.find(eventfav => eventfav.id === event.id) ? true : false}
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Card>
      )})
    }
  </div>
)

export default EventsTabContent;
