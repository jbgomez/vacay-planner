import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import LandingPageBody from './LandingPageBody.jsx';

const LandingPage = (props) => (
  <div>

    <NavBar user={props.user} />
    <LandingPageBody
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

export default LandingPage;