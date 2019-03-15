import React from 'react'
import './Thought.css'

class Thought extends React.Component {
  render(props) {
    return (
      <div>
        <div className="thought-date">{this.props.thought.createdAt}</div>
        <div className="thought-text">{this.props.thought.text}</div>
      </div>
    )
  }
}

export default Thought
