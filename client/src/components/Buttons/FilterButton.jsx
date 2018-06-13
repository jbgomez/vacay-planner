import React, { Component } from 'react'
import { Button, Checkbox, Modal, Rating, Form } from 'semantic-ui-react'

class FilterButton extends Component {
  constructor(props) {
    super(props);
    this.state = {size: 'small',
                  open: false,
                  priceRange: '2',
                  openNow: false};
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.updatePriceRange = this.updatePriceRange.bind(this);
    this.updateOpenNow = this.updateOpenNow.bind(this);
  }

  show() {
    this.setState({open: true});
  }

  close() {
    this.setState({open: false});
  }

  onFilter() {
    const filterCriteria = {'price': this.state.priceRange,
                         'open_now': this.state.openNow};
    this.props.filterRestaurants(filterCriteria);
    this.close();
  }

  updatePriceRange(e, price) {
    this.setState({priceRange: price.value})
  }

  updateOpenNow() {
    const openNow = !this.state.openNow;
    this.setState({openNow: openNow})
  }

  render() {
    return (
      <div style={{position: 'absolute', top: 0, right: '0.85em'}} >
        <Button onClick={this.show}>Filter</Button>
        <Modal size={this.state.size} open={this.state.open} onClose={this.close}>
          <Modal.Header>Select Filter Criteria</Modal.Header>
          <Modal.Content>
            <p>Price Range: </p>
            <Form>
              <Checkbox
                radio
                label='$$$$$'
                name='checkboxRadioGroup'
                value= '5'
                checked={this.state.priceRange === '5'}
                onChange={this.updatePriceRange}
              />
              <span>    </span>
              <Checkbox
                radio
                label='$$$$'
                name='checkboxRadioGroup'
                value= '4'
                checked={this.state.priceRange === '4'}
                onChange={this.updatePriceRange}
              />
              <span>    </span>
              <Checkbox
                radio
                label='$$$'
                name='checkboxRadioGroup'
                value= '3'
                checked={this.state.priceRange === '3'}
                onChange={this.updatePriceRange}
              />
              <span>    </span>
              <Checkbox
                radio
                label='$$'
                name='checkboxRadioGroup'
                value= '2'
                checked={this.state.priceRange === '2'}
                onChange={this.updatePriceRange}
              />
              <span>    </span>
              <Checkbox
                radio
                label='$'
                name='checkboxRadioGroup'
                value= '1'
                checked={this.state.priceRange === '1'}
                onChange={this.updatePriceRange}
              />
            </Form>
            <p></p>
            <Checkbox label='Open Now' checked = {this.state.openNow} onChange={this.updateOpenNow}/>
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


