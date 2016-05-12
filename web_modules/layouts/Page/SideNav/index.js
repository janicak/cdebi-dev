import React, { Component, PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"
import _ from "lodash"

import SearchBar from "../../../SearchBar"

export default class SideNav extends Component {
  render() {
    const { title, className } = this.props
    const pageOrder = this.context.metadata.pageOrder
    const pages = enhanceCollection(this.context.collection, {
      filter: { layout: "Page" },
    })
    const handleTitleClick = function(e) {
      e.preventDefault()
      history.pushState("", document.title, window.location.pathname)
      const page = document.getElementById("page").parentElement
      page.scrollTop = 0
    }
    const iterateMenuItem = function(obj) {
      if (!obj.hasOwnProperty("children")) {
        const item = _.find(pages, function(o) {
          return o.__filename == obj.filename
        })
        if (!item) {
          return
        }
        if (item.title === title) {
          return (
            <li key={ item.__url }
              className="pure-menu-item pure-menu-selected"
            >
              <a href="#" onClick={ handleTitleClick }
                className="pure-menu-link"
              >
                { item.title }
              </a>
            </li>
          )
        }
        return (
          <li key={ item.__url } className="pure-menu-item">
            <a href={ item.__url } className="pure-menu-link">
              { item.title }
            </a>
          </li>
        )
      }
      else {
        const children = _.map(obj.children, function(obj) {
          return iterateMenuItem(obj)
        })
        return (
          <li key={ obj.section }
            className="pure-menu-heading pure-menu-has-children"
          >
              { obj.section }
              <ul className="pure-menu-children">
                { children }
              </ul>
          </li>
        )
      }
    }
    const menu = pageOrder.map(function(obj) {
      return iterateMenuItem(obj)
    })
    return (
      <div className={ className }>
        <SearchBar />
        <div className="pure-menu">
          <ul className="pure-menu-list">
            { menu }
          </ul>
        </div>
      </div>
    )
  }
}

SideNav.propTypes = {
  title: PropTypes.string,
  toc: PropTypes.string,
  className: PropTypes.string,
}

SideNav.contextTypes = {
  collection: PropTypes.array.isRequired,
  metadata: PropTypes.object,
}
