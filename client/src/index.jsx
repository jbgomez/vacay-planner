import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import FoodAndEventsPage from './components/FoodAndEventsPage/FoodAndEventsPage.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import SignUpPage from './components/SignUpPage/SignUpPage.jsx';
import LoginPage from './components/LoginPage/LoginPage.jsx';
import MyTripsPage from './components/MyTripsPage/MyTripsPage.jsx';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const Router = BrowserRouter;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      startDate: new Date(),
      endDate: new Date(new Date().valueOf() + 60 * 60 * 24 * 1000),
      address: ''
    };
    this.loginUser = this.loginUser.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.handleStartDayChange = this.handleStartDayChange.bind(this);
    this.handleEndDayChange = this.handleEndDayChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleAddressSelect = this.handleAddressSelect.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //write functions

  loginUser(email, password, history) {
    $.ajax({
      url: '/login',
      method: 'POST',
      data: {email: email, password: password},
      dataType: 'json',
      success: (data) => {
        this.setState({ user: data })
        history.push('/')
      },
      error: (err) => {
        alert(err.responseText);
      }
    })
  }

  signUpUser(email, password, history) {
    $.ajax({
      url: '/signup',
      method: 'POST',
      data: {email: email, password: password},
      dataType: 'json',
      success: (data) => {
        this.setState({ user: data })
        history.push('/')
      },
      error: (err) => {
        alert(err.responseText);
      }
    })
  }

  handleStartDayChange(day) {
    this.setState({ startDate: day });
  }

  handleEndDayChange(day) {
    this.setState({ endDate: day });
  }

  handleLogout() {
    this.setState({user: null})
  }

  handleAddressChange(address) {
    this.setState({
      address: address,
      latLng: null
    });
  }

  handleAddressSelect(location, placeId, cb) {
    const newState = { address: location };
    geocodeByAddress(location)
      .then(results => {
        newState.addressComponents = {
          city: results[0].address_components[0].long_name,
          stateCode: results[0].address_components[2].short_name,
          countryCode: results[0].address_components[3].short_name
        };
        return getLatLng(results[0]);
      })
      .then(latLng => {
        newState.latLng = latLng;
        this.setState(newState, () => cb ? cb() : null);
      })
      .catch(error => console.error('Error', error))
  }

  handleSubmit(history) {
    if (!this.state.address.trim().length) {
      alert('Please select a valid city and state.');
    } else if (this.state.startDate >= this.state.endDate) {
      alert('Start Date cannot be greater than End Date');
    } else if (!this.state.latLng) {
      const savedSuggestion = document.querySelector('.location-search-input').getAttribute('data-first-suggestion');
      this.handleAddressSelect(savedSuggestion, null, () => {
        history.push('/foodandevents');
      });
    } else {
      history.push('/foodandevents');
    }
  }

  render() {
    return (
      <Router>
        <div className='container'>
          <Route exact path='/' render={(props) => {
            return (
              <LandingPage
                user={this.state.user}
                address={this.state.address}
                handleStartDayChange={this.handleStartDayChange}
                handleEndDayChange={this.handleEndDayChange}
                handleAddressChange={this.handleAddressChange}
                handleAddressSelect={this.handleAddressSelect}
                handleLogout={this.handleLogout}
                handleSubmit={this.handleSubmit}
                {...props}
              />
            )} }/>
          <Route path='/login' render={(props) => {
            return (
              <LoginPage loginUser={this.loginUser} {...props} />
            )} }/>
          <Route path='/signup' render={(props) => {
            return (
              <SignUpPage signUpUser={this.signUpUser} {...props} />
            )} }/>
          <Route path='/foodandevents' render={(props) => {
            return (
              <FoodAndEventsPage
                user={this.state.user}
                addressComponents={this.state.addressComponents}
                latLng={this.state.latLng}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                handleLogout={this.handleLogout}
                {...props} />
            )} }/>
          <Route path='/mytrips' render={(props) => {
            return (
              <MyTripsPage user={this.state.user} handleLogout={this.handleLogout} {...props} />
            )} } />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
