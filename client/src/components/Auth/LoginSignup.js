import React from 'react';
import axios from 'axios';
import './LoginSignup.css';
import logo from './../../buddha.jpg';

//TODO: Handle and display log in and user sign up errors
//Currently printing to console only
class LoginSignup extends React.Component {
  constructor(props) {
    super();
    this.state = {
      logInPrompt: true,
      submitButtonText: "Log In",
      email: "",
      password: "",
    }

    this.handleLogInPromptChange = this.handleLogInPromptChange.bind(this);
    this.handleSignUpPromptChange = this.handleSignUpPromptChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //Changes to Log In prompt from Sign Up prompt
  handleLogInPromptChange() {
    if (!this.state.logInPrompt) {
      this.setState({
        logInPrompt: true,
        submitButtonText: "Log In"
      });
    }
  }

  //Changes to Sign Up prompt from Log in prompt
  handleSignUpPromptChange() {
    if (this.state.logInPrompt) {
      this.setState({
        logInPrompt: false,
        submitButtonText: "Sign Up"
      });
    }
  }

  //Controlled Component form method to ensure React state is singular source
  //of truth about state
  handleChange(e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  //Creates API request to log in a user, or create a new user
  //TODO: Store and display auth errors(Currently logged to console)
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.logInPrompt) {
      axios.post('/api/user/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then((response) => {
        if (response.status === 200) {
          this.props.handleAuth(response.data.token)
        }
      })
      .catch((error) => {
        console.log(error);
      })
    } else {
      axios.post('/api/user', {
        email: this.state.email,
        password: this.state.password
      })
      .then((response) => {
        if (response.status === 201) {
          this.props.handleAuth(response.data.token)
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  //TODO: Refactor into a Logo Component and a Credentials Component
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
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <label>Password<br />
                <input
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </label>
              <br />
              <button
                id='submit-button'
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
