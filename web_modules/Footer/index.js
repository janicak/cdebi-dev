import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import pkg from "../../package.json"

import styles from "./index.css"

/* eslint max-len:0 quotes: 0*/

export default class Footer extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  render() {
    const baseHref = this.context.router.createHref("/")
    let baseUrl = ""

    if (typeof window != "undefined") {
      const { protocol, host } = window.location
      baseUrl = `${protocol}//${host}${baseHref}`
    }

    return (
      <footer className={ styles.footer }>
        { `© 2009-2016 Center for Dark Energy Biosphere
          Investigations (C-DEBI)` }
        <br />
        <Link
          className={ styles.link }
          to="/contact"
        >
          { "Contact Us" }
        </Link>
        { " | " }
        <a
          href={ pkg.twitter }
          className={ styles.link }
        >{ "Twitter" }</a>
        { " | " }
        <a
          href={ pkg.facebook }
          className={ styles.link }
        >{ "Facebook" }</a>
        <br />
        <Link
          className={ styles.link }
          to="/support"
        >
          { "SUPPORT C-DEBI TODAY" }
        </Link>
        { " | " }
        <a
          href={ "http://www.nsf.gov/" }
          className={ styles.link }
        >{ "National Science Foundation" }</a>
      <br /><br />
        <a href={ "http://www.usc.edu/" }>
          <img src={ `${baseUrl}assets/USClogo3.gif` } style={ { height: "18px" } } />
        </a>&nbsp;&nbsp;
        <a href={ "http://www.mbl.edu/" } >
          <img src={ `${baseUrl}assets/mbl2.gif` } style={ { height: "36px" } } />
        </a>&nbsp;&nbsp;
        <a href={ "http://www.uaf.edu/" } >
          <img src={ `${baseUrl}assets/UAFlogo3.gif` } style={ { height: "19px" } } />
        </a>&nbsp;&nbsp;
        <a href={ "http://www.ucsc.edu" } >
          <img src={ `${baseUrl}assets/UCSClogo3.gif` } style={ { height: "18px" } } />
        </a>&nbsp;&nbsp;
        <a href={ "http://www.uri.edu/" } >
          <img src={ `${baseUrl}assets/URIlogo3.gif` } style={ { height: "23px" } } />
        </a>
      </footer>
    )
  }
}
