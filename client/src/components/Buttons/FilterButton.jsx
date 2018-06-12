import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class FilterButton extends Component {
  constructor(props) {
    super(props);
    this.state = {size: 'small',
                  open: false };
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.onFilter = this.onFilter.bind(this);
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

  render() {
    return (
      <div style={{position: 'absolute', top: 0, right: '0.85em'}} >
        <Button onClick={this.show}>Filter</Button>
        <Modal size={this.state.size} open={this.state.open} onClose={this.close}>
          <Modal.Header>Filter</Modal.Header>
          <Modal.Content>
            <p>Select Filter Criteria</p>
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


