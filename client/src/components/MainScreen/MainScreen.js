import React from 'react'
import './MainScreen.css'
import NavBar from './NavBar'
import Content from './Content'
import MainInput from './MainInput'
import axios from 'axios'

class MainScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      checking: "thoughts",
      thoughts: [],
      reviewable: [],
      realizations: []
    }

    this.handleScreenChange = this.handleScreenChange.bind(this)
    this.getUserData = this.getUserData.bind(this)
  }

  componentDidMount() {
    this.getUserData()
  }

  handleScreenChange(e) {
    e.preventDefault()
    const { name } = e.target
    this.setState({
      checking: name
    })
  }

  getUserData() {
    axios.get('/api/thoughts', { headers: { Authorization: this.props.token } })
      .then(response => {
        const reviewable = response.data.filter((thought) => {
          return !thought.reviewed
        })
        this.setState({
          thoughts: response.data,
          reviewable
        })
      })
      .catch(error => {
        console.log(error)
      })

    axios.get('/api/realizations', { headers: { Authorization: this.props.token } })
      .then(response => {
        this.setState({
          realizations: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="main">
        <NavBar
          checking={this.state.checking}
          handleScreenChange={this.handleScreenChange}
        />
        <Content
          checking={this.state.checking}
          thoughts={this.state.thoughts}
          reviewable={this.state.reviewable}
          getUserData={this.getUserData}
          realizations={this.state.realizations}
          handleScreenChange={this.handleScreenChange}
          token={this.props.token}
        />
        <MainInput
          checking={this.state.checking}
          handleScreenChange={this.handleScreenChange}
          getUserData={this.getUserData}
          token={this.props.token}
        />
      </div>
    )
  }
}

export default MainScreen
