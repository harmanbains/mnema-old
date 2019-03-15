import React from 'react'
import './ReviewThought.css'
import axios from 'axios'

class ReviewThought extends React.Component {
  constructor() {
    super()

    this.handleReview = this.handleReview.bind(this)
  }

  handleReview(e) {
    e.preventDefault()
    const { value } = e.target
    axios.patch(`/api/thought/${value}`,
      { reviewed: true},
      { headers: { Authorization: this.props.token } }
    )
    .then((response) => {
      if (response.status === 200) {
        this.props.getUserData()
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <div className="review-date">{this.props.reviewable.createdAt}</div>
        <div className="review-text">
          <div>{this.props.reviewable.text}</div>
          <button
            className="review-button"
            value={this.props.reviewable._id}
            onClick={this.handleReview}
          >Review</button>
        </div>
      </div>
    )
  }
}

export default ReviewThought
