import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"
import invariant from "invariant"
import { joinUri } from "phenomic"
import { Scrollbars } from "react-custom-scrollbars"

import Footer from "../../Footer"

import styles from "./index.css"
import SideNav from "./SideNav"
// import tocHelper from "./SideNav/toc"

/* eslint react/no-string-refs: 0 */

class Page extends Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
  }
  componentDidMount() {
    if (localStorage.scroll1pos) {
      this.refs.Scrollbar1.scrollTop(localStorage.scroll1pos)
    }
  }
  handleScroll() {
    localStorage.scroll1pos = this.refs.Scrollbar1.getScrollTop()
    localStorage.scroll2pos = this.refs.Scrollbar2.getScrollTop()
  }
  render() {
    const { props, context } = this

    const {
      pkg,
    } = context.metadata

    const {
      __filename,
      __url,
      head,
      header,
      footer,
      body,
    } = props

    // const { body, toc } = tocHelper(props.body)

    invariant(
      typeof head.title === "string",
      `Your page '${ __filename }' needs a title`
    )

    const metaTitle = head.metaTitle ? head.metaTitle : head.title

    const meta = [
      { property: "og:type", content: "article" },
      { property: "og:title", content: metaTitle },
      {
        property: "og:url",
        content: joinUri(process.env.PHENOMIC_USER_URL, __url),
      },
      { property: "og:description", content: head.description },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: metaTitle },
      { name: "twitter:creator", content: `@${ pkg.twitter }` },
      { name: "twitter:description", content: head.description },
      { name: "description", content: head.description },
    ]

    return (
      <div>
        <Helmet
          title={ metaTitle }
          meta={ meta }
        />

        <div className={ styles.Container } >

          <div className={ styles.ColumnOne }>

            <Scrollbars ref="Scrollbar1" onScrollStop={ this.handleScroll }>

              <SideNav
                title={ metaTitle }
                // toc={ toc }
                className={ styles.SideNav }
              />
            </Scrollbars>
          </div>

          <div className={ styles.ColumnTwo }>
            <Scrollbars ref="Scrollbar2" onScroll={ this.handleScroll } >
              <div className={ styles.PageContainer } id="page">
                <div className={ styles.MainContent }>
                    { head.title && <h1> { head.title } </h1> }
                    { header }
                    { body &&
                      <div dangerouslySetInnerHTML={ { __html: body } } /> }
                    { props.children }
                    { footer }
                    <Footer />
                </div>
                <div className={ styles.MarginContent }>
                  { "Placeholder margin content" }
                </div>
              </div>
            </Scrollbars>
          </div>

        </div>
      </div>
    )
  }
}

Page.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  __filename: PropTypes.string.isRequired,
  __url: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired,
  body: PropTypes.string.isRequired,
  header: PropTypes.element,
  footer: PropTypes.element,
}

Page.contextTypes = {
  metadata: PropTypes.object.isRequired,
}

export default Page
