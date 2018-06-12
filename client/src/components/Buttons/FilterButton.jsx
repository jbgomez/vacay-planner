import React, { Component } from 'react'
import { Button, Modal, Rating } from 'semantic-ui-react'

class FilterButton extends Component {
  constructor(props) {
    super(props);
    this.state = {size: 'small',
                  open: false,
                  rating: 0};
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.recordRating = this.recordRating.bind(this);
  }

  show() {
    this.setState({open: true});
  }

  close() {
    this.setState({open: false});
  }

  onFilter() {
    this.close();
  }

  recordRating(event, data) {
    this.setState({rating: data.rating});
  }

  render() {
    return (
      <div style={{position: 'absolute', top: 0, right: '0.85em'}} >
        <Button onClick={this.show}>Filter</Button>
        <Modal size={this.state.size} open={this.state.open} onClose={this.close}>
          <Modal.Header>Select Filter Criteria</Modal.Header>
          <Modal.Content>
            <p>Rating</p>
            <Rating maxRating={5} clearable onRate = {this.recordRating} />
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick = {this.onFilter}>Yes</Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default FilterButton


