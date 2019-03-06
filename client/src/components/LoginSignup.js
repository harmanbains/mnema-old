import React from 'react';
import axios from 'axios';
import './LoginSignup.css';
import logo from './../buddhaSquare.jpg';


class LoginSignup extends React.Component {
  constructor() {
    super();
    this.state = {
      logInPrompt: true,
      submitButtonText: "Log In"
    }

    this.handleLogInPromptChange = this.handleLogInPromptChange.bind(this);
    this.handleSignUpPromptChange = this.handleSignUpPromptChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleLogInPromptChange() {
    if (!this.state.logInPrompt) {
      this.setState({
        logInPrompt: true,
        submitButtonText: "Log In"
      });
    }
  }

  handleSignUpPromptChange() {
    if (this.state.logInPrompt) {
      this.setState({
        logInPrompt: false,
        submitButtonText: "Sign Up"
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.logInPrompt) {
      axios.post('https://boiling-river-63231.herokuapp.com/users/login')
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
    } else {
      console.log('Signing Up');
    }
  }

  render() {
    return (
      <div className="login">
        <img src={logo} className="logo" alt="logo" />
        <h1 className="welcome">Welcome to Mnema</h1>
        <div className="selectors">
          <button
            className={this.state.logInPrompt ? "login-button selected" : "login-button"}
            onClick={this.handleLogInPromptChange}
          >Log In</button>
          <button
            className={this.state.logInPrompt ? "signup-button" : "signup-button selected" }
            onClick={this.handleSignUpPromptChange}
          >Sign Up</button>
        </div>
        <div className="inputBox">
          <div className="inputs">
            <form>
              <label>Email<br />
                <input
                  type='text'
                  placeholder='email'
                />
              </label>
              <br />
              <label>Password<br />
                <input
                  type='password'
                  placeholder='password'
                />
              </label>
              <br />
              <button
                id="submit-button"
                onClick={this.handleSubmit}
              >{this.state.submitButtonText}</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginSignup
