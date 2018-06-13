import React, { Component } from 'react'
import { Button, Checkbox, Modal, Rating, Form } from 'semantic-ui-react'

class FilterEventButton extends Component {
  constructor(props) {
    super(props);
    this.state = {size: 'small',
                  open: false,
                  includeFamily: 'yes'};
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.updateIncludeFamily = this.updateIncludeFamily.bind(this);
  }

  show() {
    this.setState({open: true});
  }

  close() {
    this.setState({open: false});
  }

  onFilter() {
    const filterCriteria = {'includeFamily': this.state.includeFamily};
    this.props.filterEvents(filterCriteria);
    this.close();
  }

  updateIncludeFamily(e, data) {
    this.setState({includeFamily: data.value})
  }

  render() {
    return (
      <div style={{position: 'absolute', top: 0, right: '0.85em'}} >
        <Button onClick={this.show}>Filter</Button>
        <Modal size={this.state.size} open={this.state.open} onClose={this.close}>
          <Modal.Header>Select Filter Criteria</Modal.Header>
          <Modal.Content>
            <p>Include Family-friendly events?</p>
            <Form>
              <Checkbox
                radio
                label='yes'
                name='checkboxRadioGroup'
                value= 'yes'
                checked={this.state.includeFamily === 'yes'}
                onChange={this.updateIncludeFamily}
              />
              <span>    </span>
              <Checkbox
                radio
                label='no'
                name='checkboxRadioGroup'
                value= 'no'
                checked={this.state.includeFamily === 'no'}
                onChange={this.updateIncludeFamily}
              />
              <span>    </span>
              <Checkbox
                radio
                label='only'
                name='checkboxRadioGroup'
                value= 'only'
                checked={this.state.includeFamily === 'only'}
                onChange={this.updateIncludeFamily}
              />
            </Form>
            <p></p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive onClick = {this.onFilter}>Filter</Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default FilterEventButton


