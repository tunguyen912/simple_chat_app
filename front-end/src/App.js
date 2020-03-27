import React from 'react';
import './App.css';
import AdminLogin from './components/admin-login-form'
import GuestLogin from './components/guest-login-form'
import Welcome from './components/welcome'
import EventHistory from './components/eventHistory'
import ChatHistory from './components/chatHistory'
import RoomHistory from './components/roomHistory'

import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route exact path="/login/admin">
          <AdminLogin />
        </Route>
        <Route exact path="/login/guest">
          <GuestLogin />
        </Route>
        <Route exact path="/EventHistory">
          <EventHistory />
        </Route>
        <Route exact path="/ChatHistory">
          <ChatHistory />
        </Route>
        <Route exact path="/Rooms">
          <RoomHistory />
        </Route>
      </Switch>
  </Router>
  );
}

export default App;
