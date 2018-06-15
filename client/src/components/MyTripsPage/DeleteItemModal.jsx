import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

class DeleteItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalOpen: false};
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen () {
    this.setState({modalOpen: true});
  }

  handleClose () {
    this.setState({modalOpen: false});
  }


  render()
  {
    return (
      <Modal
        trigger={
          <Button className="ui button red small"
          style={{position: 'absolute', top: '10px', right: '10px'}}
          onClick={this.handleOpen}>
            X
          </Button>
        }
        basic size='small'
        open={this.state.modalOpen}>
        <Header icon='trash' content='Remove Item'/>
        <Modal.Content>
          <p>
            Are you sure you want to remove this item from your trip?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={this.handleClose}>
            <Icon name='remove'/> No
          </Button>
          <Button color='green' inverted onClick={() => {
            this.props.handleDeleteClick(this.props.item);
            this.handleClose();
          }}>
            <Icon name='checkmark'/> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}


export default DeleteItemModal;
