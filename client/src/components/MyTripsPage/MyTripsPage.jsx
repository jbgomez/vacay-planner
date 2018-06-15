import React from 'react';
import NavBar from '../NavBar/NavBar.jsx';
import MyTripsPageBody from './MyTripsPageBody.jsx';

const MyTripsPage = (props) => {
  return (
    <div className='mytripspage'>
      <NavBar user={props.user} handleLogout={props.handleLogout}/>
      <MyTripsPageBody history={props.history}/>
    </div>
  )
}
export default MyTripsPage;