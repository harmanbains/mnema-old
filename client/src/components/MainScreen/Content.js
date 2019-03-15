import React from 'react'
import './Content.css'
import Thought from './Thought.js'
import ReviewThought from './ReviewThought.js'

class Content extends React.Component {
  constructor() {
    super()
    this.state = {
      checking: "thoughts"
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ checking: nextProps.checking })
  }

  render() {
    if (this.state.checking === 'thoughts') {
      return (
        <div className="content">
          {this.props.thoughts.map((thought, index) => {
            return ( <Thought thought={thought} key={index} /> )
          })}
        </div>
      )
    } else if (this.state.checking === 'review') {
      return (
        <div className="content">
          {this.props.reviewable.map((thought, index) => {
            return (
              <ReviewThought
                reviewable={thought}
                key={index}
                getUserData={this.props.getUserData}
                token={this.props.token}
              />
            )
          })}
        </div>
      )
    } else {
      return (
        <div className="content">
          {this.props.realizations.map((realization, index) => {
            return ( <Thought thought={realization} key={index} />)
          })}
        </div>
      )
    }
  }
}

export default Content
