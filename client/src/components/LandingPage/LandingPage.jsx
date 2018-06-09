import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import LandingPageBody from './LandingPageBody.jsx';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTrips: []
    };
    this.getAllTrips = this.getAllTrips.bind(this);
  }

  componentDidMount() {
    this.getAllTrips();
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
        <NavBar user={props.user} />
        <LandingPageBody
          allTrips={this.state.allTrips}
          history={props.history}
          address={props.address}
          handleStartDayChange={props.handleStartDayChange}
          handleEndDayChange={props.handleEndDayChange}
          handleLogout={props.handleLogout}
          handleAddressChange={props.handleAddressChange}
          handleAddressSelect={props.handleAddressSelect}
          handleSubmit={props.handleSubmit}
        />
      </div>
    );
  }
}

export default LandingPage;