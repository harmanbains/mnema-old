import React, { Component } from 'react'

import './App.css'
import LoginSignup from './Auth/LoginSignup'
import MainScreen from './MainScreen/MainScreen'

class App extends Component {
  constructor() {
    super()
    this.state = {
      auth: false,
      token: ""
    }

    this.handleAuth = this.handleAuth.bind(this)
  }

  handleAuth(token) {
    this.setState({
      auth: true,
      token: 'Bearer '.concat(token)
    })
  }

  render() {
    return (
      <div>
        {this.state.auth ? <MainScreen token={this.state.token}/> : <LoginSignup handleAuth={this.handleAuth}/>}
      </div>
    );
  }
}

export default App;
