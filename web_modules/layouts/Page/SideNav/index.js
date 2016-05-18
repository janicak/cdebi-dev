import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import enhanceCollection from "phenomic/lib/enhance-collection"
import _ from "lodash"
import Isvg from "react-inlinesvg"

import styles from "./index.css"
import SearchBar from "../../../SearchBar"

export default class SideNav extends Component {

  render() {
    const baseHref = this.context.router.createHref("/")
    let baseUrl = ""

    if (typeof window != "undefined") {
      const { protocol, host } = window.location
      baseUrl = `${protocol}//${host}${baseHref}`
    }

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
              <span>{ obj.section }</span>
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
        <div className={ styles.header }>
          <Link to="/" className={ styles.identity }>
            <Isvg src={ `${baseUrl}assets/C-DEBI_logo.svg` }
              className={ styles.logo }
            >
              <img src={ `${baseUrl}assets/C-DEBI_logo.svg` }
                className={ styles.logo }
              />
            </Isvg>
            <div className={ styles.title }>
              { "Center for Dark Energy Biosphere Investigations" }
            </div>
          </Link>
          <SearchBar />
        </div>
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
  router: PropTypes.object,
}
