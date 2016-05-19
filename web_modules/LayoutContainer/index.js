import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"

import styles from "./index.css"

export default class Layout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const {
      pkg,
    } = this.context.metadata

    return (
      <div className={ styles.layout }>
        <Helmet
          meta={ [
            {
              name: "generator", content: `${
              process.env.PHENOMIC_NAME } ${ process.env.PHENOMIC_VERSION }`,
            },
            { property: "og:site_name", content: pkg.name },
            { name: "twitter:site", content: `@${ pkg.twitter }` },
            { name: "viewport",
              content: "width=device-width, initial-scale=1" },
          ] }
          script={ [
            { src: "https://cdn.polyfill.io/v2/polyfill.min.js" },
          ] }
          link={ [
            {
              rel: "stylesheet",
              href: "http://yui.yahooapis.com/pure/0.6.0/pure-min.css",
            },
          ] }
        />
        <div className={ styles.content }>
          { this.props.children }
        </div>
      </div>
    )
  }
}
