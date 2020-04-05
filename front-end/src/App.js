import React from 'react';
import './App.css';
import AdminLogin from './components/admin/admin-login-form'
import GuestLogin from './components/guest/guest-login-form'
import Welcome from './components/welcome'
import EventHistory from './components/admin/eventHistory'
import ChatHistory from './components/admin/chatHistory'
import RoomHistory from './components/admin/roomHistory'

import ChatRoom from './components/guest/chatroom/ChatRoom'

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
        <Route exact path="/admin/EventHistory">
          <EventHistory />
        </Route>
        <Route exact path="/admin/ChatHistory">
          <ChatHistory />
        </Route>
        <Route exact path="/admin/Rooms">
          <RoomHistory />
        </Route>
        <Route exact path="/ChatRoom">
          <ChatRoom />
        </Route>
      </Switch>
  </Router>
  );
}

export default App;
