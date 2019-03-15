import React from 'react'
import './MainInput.css'
import axios from 'axios'

class MainInput extends React.Component {
  constructor() {
    super()
    this.state = {
      text: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const { value } = e.target
    this.setState({
      text: value
    })
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.checking) !== JSON.stringify(nextProps.checking)) {
      this.setState({
        text: ""
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    if(this.props.checking === 'thoughts') {
      axios.post('/api/thought',
        { text: this.state.text},
        { headers: { Authorization: this.props.token } }
      )
      .then((response) => {
        if (response.status === 201) {
          this.props.getUserData()
          this.setState({
            text: ""
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
    } else {
      axios.post('/api/realization',
        { text: this.state.text},
        { headers: { Authorization: this.props.token } }
      )
      .then((response) => {
        if (response.status === 201) {
          this.props.getUserData()
          this.setState({
            text: ""
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }

  }

  render(props) {
    return (
      <form className="input-form">
        <input
          autoFocus
          className='maininput'
          name='maininput'
          type='text'
          placeholder={this.props.checking === "thoughts" ? "New Thought" : "New Realization"}
          value={this.state.text}
          onChange={this.handleChange}
        />
        <button
          id='mainsubmit-button'
          onClick={this.handleSubmit}
        >Submit</button>
      </form>
    )
  }
}

export default MainInput
