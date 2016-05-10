import React, { Component, PropTypes } from "react"
// import styles from "./index.css"
import { browserHistory } from "phenomic/lib/client"

// Make some random string
const makeId = () => {
  let text = ""
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export default class Homepage extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  handleButtonClick = () => {
    browserHistory.push(`/search/?query=${ makeId() }`)
  }

  render() {
    return (
      <div>
        <span>
          { "Current query is" }
          { this.props.location.search }
        </span>
        <button
          onClick={ this.handleButtonClick }
        >
          { "Submit me" }
        </button>
      </div>
    )
  }
}
