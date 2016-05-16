import React, { Component } from "react"
import { Link } from "react-router"
import pkg from "../../package.json"

import styles from "./index.css"

/* eslint max-len:0 quotes: 0*/

export default class Footer extends Component {

  render() {
    console.log(pkg)
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
          <img src={ "http://www.darkenergybiosphere.org/wp-content/uploads/USClogo3.gif" } style={ { height: "18px" } } />
        </a>&nbsp;&nbsp;
        <a href={ "http://www.mbl.edu/" } >
          <img src={ "http://www.darkenergybiosphere.org/wp-content/uploads/mbl2.gif" } style={ { height: "36px" } } />
        </a>&nbsp;&nbsp;
        <a href={ "http://www.uaf.edu/" } >
          <img src={ "http://www.darkenergybiosphere.org/wp-content/uploads/UAFlogo3.gif" } style={ { height: "19px" } } />
        </a>&nbsp;&nbsp;
        <a href={ "http://www.ucsc.edu" } >
          <img src={ "http://www.darkenergybiosphere.org/wp-content/uploads/UCSClogo3.gif" } style={ { height: "18px" } } />
        </a>&nbsp;&nbsp;
        <a href={ "http://www.uri.edu/" } >
          <img src={ "http://www.darkenergybiosphere.org/wp-content/uploads/URIlogo3.gif" } style={ { height: "23px" } } />
        </a>
      </footer>
    )
  }
}
