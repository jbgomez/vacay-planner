import React, { Component } from 'react'
import { Button, Checkbox, Modal, Rating, Form } from 'semantic-ui-react'

class FilterEventButton extends Component {
  constructor(props) {
    super(props);
    this.state = {size: 'small',
                  open: false,
                  includeFamily: 'yes',
                  source: undefined};
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.updateIncludeFamily = this.updateIncludeFamily.bind(this);
    this.updateSource = this.updateSource.bind(this);
  }

  show() {
    this.setState({open: true});
  }

  close() {
    this.setState({open: false});
  }

  onFilter() {
    const filterCriteria = {'includeFamily': this.state.includeFamily,
                            'source' : this.state.source};
    this.props.filterEvents(filterCriteria);
    this.close();
  }

  updateIncludeFamily(e, data) {
    this.setState({includeFamily: data.value})
  }

  updateSource(e, data) {
    this.setState({source: data.value})
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
            <p>Select Source</p>
            <Form>
              <Checkbox
                radio
                label='ticketmaster'
                name='checkboxRadioGroup'
                value= 'ticketmaster'
                checked={this.state.source === 'ticketmaster'}
                onChange={this.updateSource}
              />
              <span>    </span>
              <Checkbox
                radio
                label='universe'
                name='checkboxRadioGroup'
                value= 'universe'
                checked={this.state.source === 'universe'}
                onChange={this.updateSource}
              />
              <span>    </span>
              <Checkbox
                radio
                label='frontgate'
                name='checkboxRadioGroup'
                value= 'frontgate'
                checked={this.state.source === 'frontgate'}
                onChange={this.updateSource}
              />
              <span>    </span>
              <Checkbox
                radio
                label='tmr'
                name='checkboxRadioGroup'
                value= 'tmr'
                checked={this.state.source === 'tmr'}
                onChange={this.updateSource}
              />
            </Form>
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


