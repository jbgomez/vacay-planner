import React, { Component } from 'react'
import { Button, Checkbox, Modal, Rating, Form } from 'semantic-ui-react'

class FilterButton extends Component {
  constructor(props) {
    super(props);
    this.state = {size: 'small',
                  open: false,
                  priceRange: '2'};
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.updatePriceRange = this.updatePriceRange.bind(this);
  }

  show() {
    this.setState({open: true});
  }

  close() {
    this.setState({open: false});
  }

  onFilter() {
    // call filter method
    // Number(this.state.priceRange)
    this.close();
  }

  updatePriceRange(e, price) {
    console.log('priceRange>>' + price.value);
    this.setState({priceRange: price.value})
  }

  // recordRating(event, data) {
  //   this.setState({rating: data.rating});
  // }

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

// <Rating maxRating={5} clearable onRate = {this.recordRating} />


