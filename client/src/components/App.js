import React, { Component } from 'react'

import './App.css'
import LoginSignup from './Auth/LoginSignup'
import MainScreen from './MainScreen/MainScreen'


class App extends Component {
  constructor() {
    super()
    //Auth is set to true if the user is authenticated
    //token stores the JWT and passes it around for use in API requests
    //TODO: store and retrieve token from localstorage to prevent user having
    //to log in again on page refresh/revisit
    this.state = {
      auth: false,
      token: ""
    }

    this.handleAuth = this.handleAuth.bind(this)
  }

  //auth method passed down to LoginSignup Component to allow App state
  //to be updated
  handleAuth(token) {
    this.setState({
      auth: true,
      token: 'Bearer '.concat(token)
    })
  }

  //conditionally renders either the MainScreen component or LoginSignup component
  //based on weither this.state.auth is true or false
  render() {
    return (
      <div>
        {this.state.auth ? <MainScreen token={this.state.token}/> : <LoginSignup handleAuth={this.handleAuth}/>}
      </div>
    );
  }
}

export default App;
