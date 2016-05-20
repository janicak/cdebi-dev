import React, { Component, PropTypes } from "react"
import { Link } from "react-router"
import Helmet from "react-helmet"
import invariant from "invariant"
import { joinUri } from "phenomic"
import { Scrollbars } from "react-custom-scrollbars"
import classNames from "classnames"
import _ from "lodash"

import Footer from "../../Footer"

import styles from "./index.css"
import SideNav from "./SideNav"

import LightBox from "../../vendor/lightbox"
import "../../../legacy-css/lightbox.css"

/* eslint react/no-string-refs: 0 */

class Page extends Component {

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
    router: PropTypes.func.isRequred,
  }

  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      shift: false,
    }
  }
  componentDidMount() {
    if (localStorage.scroll1pos) {
      this.refs.Scrollbar1.scrollTop(localStorage.scroll1pos)
    }
    this.interval = window.setTimeout(this.loadLightboxes,50)
  }
  shouldComponentUpdate() {
    return true
  }
  componentDidUpdate() {
    this.interval = window.setTimeout(this.loadLightboxes,50)
  }
  loadLightboxes() {
    const arr = document.getElementsByTagName("img")
    for (let i = 0; i < arr.length; i++) {
      if (_.has(arr[i].attributes, "data-jslghtbx")) {
        const lightbox = new LightBox()
        lightbox.load()
        break
      }
    }
  }
  /* componentWillReceiveProps() {
    console.log("I received props")
  }
  shouldComponentUpdate() {
    console.log("I should update")
  }
  componentDidUpdate() {
    console.log("I done updated")
  } */
  handleScroll() {
    localStorage.scroll1pos = this.refs.Scrollbar1.getScrollTop()
  }
  handleClick() {
    const shift = this.state.shift
    this.setState({ shift: !shift })
  }
  render() {
    const { props, context } = this

    const baseHref = this.context.router.createHref("/")
    let baseUrl = ""

    if (typeof window != "undefined") {
      const { protocol, host } = window.location
      baseUrl = `${protocol}//${host}${baseHref}`
    }

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

      <div className={ classNames(styles.Container,
        { shift: this.state.shift }) }
      >

          <div className={ styles.ColumnOne }>

            <Scrollbars ref="Scrollbar1"
              onScrollStop={ this.handleScroll } autoHide
            >

              <SideNav
                title={ metaTitle }
                // toc={ toc }
                className={ styles.SideNav }
              />
            </Scrollbars>
          </div>

          <div className={ styles.ColumnTwo }>
            <Scrollbars ref="Scrollbar2" onScroll={ this.handleScroll } >
              <div className={ styles.NavTop }>
                <span className="mega-octicon octicon-three-bars"
                  onClick={ this.handleClick }
                ></span>
                <Link to="/">{ "C-DEBI" }</Link>
              </div>
              <div className={ styles.PageContainer } id="page">
                <div className={ classNames(styles.TitleArea,
                    { "LightTitle": head["header-img"] }
                    ) }
                  style={ (head["header-img"]) ? {
                    backgroundImage:
                    "url(" + baseUrl + head["header-img"] + ")",
                  }: {} }
                >
                  { head.title && <h1> { head.title } </h1> }
                </div>
                <div className={ styles.Page } >
                  <div className={ styles.MainContent }>
                      { header }
                      { body &&
                        <div dangerouslySetInnerHTML={ { __html: body } } /> }
                      { props.children }
                      { footer }
                      <Footer />
                  </div>
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

export default Page
