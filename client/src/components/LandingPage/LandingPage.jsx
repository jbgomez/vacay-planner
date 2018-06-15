import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import LandingPageBody from './LandingPageBody.jsx';
import $ from 'jquery';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTrips: []
    };
    this.getAllTrips = this.getAllTrips.bind(this);
  }

  componentDidMount() {
    if (this.props.user != '') this.getAllTrips();
  }

  getAllTrips() {
    $.ajax({
      type: 'GET',
      url: `/trips`,
      success: result => {
        JSON.parse(result).length ?
          (
            this.setState({
              allTrips: JSON.parse(result)
            })
          )
          : ''
      }
    })
  }

  render() {
    return (
      <div>
        <NavBar user={this.props.user}/>
        <LandingPageBody
          trips={this.state.allTrips}
          history={this.props.history}
          address={this.props.address}
          handleStartDayChange={this.props.handleStartDayChange}
          handleEndDayChange={this.props.handleEndDayChange}
          handleLogout={this.props.handleLogout}
          handleAddressChange={this.props.handleAddressChange}
          handleAddressSelect={this.props.handleAddressSelect}
          handleSubmit={this.props.handleSubmit}
          getAllTrips={this.getAllTrips}
          handleEditTrip={this.handleEditTrip}
        />
      </div>
    )
  }
}

export default LandingPage;