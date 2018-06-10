import React from 'react';
import moment from 'moment';
import { Image, Item, Header, Card, Label } from 'semantic-ui-react';
import DeleteItemModal from './DeleteItemModal.jsx';

function EventsList(props) {
  return (
    <div style={{marginTop: -25}}>
      {props.eventsSelected.map((event, index) => {
        return (
          <Card fluid key={event.id}>
            <Item.Group>
              <Item>
                <Item.Image className='event-image'
                  size='small'
                  src={ event.eventImg }
                  style={ {margin: 15} }
                />
                <Item.Content>
                  <Item.Header style={{marginTop: 20}} className='event-name'>
                    {`${index + 1}. ${event.name}`}
                  </Item.Header>
                  <Item.Description>
                    <strong>{event.venueName}, </strong>{event.venueAddress}
                  </Item.Description>
                  <DeleteItemModal handleDeleteClick={props.handleDeleteClick} item={event} />
                  <Item.Extra>
                    <Label
                      style={ {textTransform: 'uppercase', backgroundColor: '#D3D3D3', color: '#2A2A2A'} }
                    >
                      {moment(event.start_date).format('MMM DD ddd')}
                    </Label>
                  </Item.Extra>
                </Item.Content>
              </Item>
            </Item.Group>
          </Card>
        )})
      }
    </div>
  )
}


export default EventsList;