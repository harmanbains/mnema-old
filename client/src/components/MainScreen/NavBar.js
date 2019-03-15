import React from 'react'
import './NavBar.css'

class NavBar extends React.Component {
  render(props) {
    return (
      <div>
        <button
          name="thoughts"
          className={this.props.checking === "thoughts" ? "nav-button check" : "nav-button"}
          onClick={this.props.handleScreenChange}
        >Thoughts</button>
        <button
          name="review"
          className={this.props.checking === "review" ? "nav-button check" : "nav-button"}
          onClick={this.props.handleScreenChange}
        >Review</button>
        <button
          name="realization"
          className={this.props.checking === "realization" ? "nav-button check" : "nav-button"}
          onClick={this.props.handleScreenChange}
        >Realization</button>
      </div>
    )
  }
}

export default NavBar
