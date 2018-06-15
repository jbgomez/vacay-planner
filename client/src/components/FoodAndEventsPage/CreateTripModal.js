import React from 'react';
import { Input, Button, Header, Icon, Modal } from 'semantic-ui-react';

class CreateTripModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      isDisabled: true,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  handleOpen() {
    this.setState({modalOpen: true});
  }

  handleClose() {
    this.setState({modalOpen: false});
  }

  onNameChange(e) {
    e.preventDefault();
    if (e.target.value.length) {
      this.setState({
        tripName: e.target.value,
        isDisabled: false,
      });
    } else {
      this.setState({
        tripName: '',
        isDisabled: true,
      });
    }
  }

  onConfirm(e) {
    e.preventDefault();
    this.props.saveAndUpdateTripData(this.state.tripName);
    this.handleClose();
  }


  render()
  {
    return (
      <Modal
        trigger={
          <a href='#' onClick={this.handleOpen}>Create New Trip</a>
        }
        basic size='small'
        open={this.state.modalOpen}>
        <Header icon='plus circle' content='Create Trip'/>
        <Modal.Content>
          <p>
            Trip name
          </p>
          <Input focus placeholder="Enter your trip name" onChange={this.onNameChange} />
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={this.handleClose}>
            <Icon name='cancel'/> Cancel
          </Button>
          <Button color='green' disabled={this.state.isDisabled} inverted onClick={this.onConfirm}>
            <Icon name='checkmark'/> Create
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}


export default CreateTripModal;
