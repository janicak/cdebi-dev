import React, { Component, PropTypes } from "react"

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = { term: "" }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({ term: event.target.value })
  }

  handleFormSubmit(event) {
    event.preventDefault()
    this.setState({ term: "" })
    this.context.router.push(`search/?${this.state.term}`)
  }

  render() {
    return (
        <form
          onSubmit={ this.handleFormSubmit }
          className="pure-form"
        >
          <input
            placeholder="Search..."
            className="pure-input-rounded"
            value={ this.state.term }
            onChange={ this.handleInputChange }
          />
        </form>
    )
  }
}

SearchBar.contextTypes = {
  router: PropTypes.object,
}

export default SearchBar
