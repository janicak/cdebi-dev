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
            { src: "https://use.typekit.net/wdw6szy.js" },
            { innerHTML: "try{Typekit.load({ async: true });}catch(e){}" },
          ] }
          link={ [
            {
              rel: "stylesheet",
              /* eslint-disable */
              href: "http://yui.yahooapis.com/pure/0.6.0/pure-min.css",
              // integrity: "sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd",
              /*eslint-enable */
              // crossorigin: "anonymous",
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
