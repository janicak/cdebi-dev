import path from "path"

import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"

import pkg from "./package.json"

import markdownIt from "markdown-it"
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor"
import markdownItSub from "markdown-it-sub"
import markdownItSup from "markdown-it-sup"
import markdownItDeflist from "markdown-it-deflist"
import markdownItIns from "markdown-it-ins"
import markdownItMark from "markdown-it-mark"
import markdownItAttrs from "markdown-it-attrs"
import markdownItContainer from "markdown-it-container"
import markdownItFigCaption from "./scripts/markdown-it.figcaption.extra"

// note that this webpack file is exporting a "makeConfig" function
// which is used for phenomic to build dynamic configuration based on your needs
// see the end of the file if you want to export a default config
// (eg: if you share your config for phenomic and other stuff)
export const makeConfig = (config = {}) => {
  return {
    ...config.dev && {
      devtool: "#cheap-module-eval-source-map",
    },
    module: {
      noParse: /\.min\.js/,
      loaders: [
        {
          // phenomic requirement
          test: /\.md$/,
          loader: "phenomic/lib/content-loader",
          // config is in phenomic.contentLoader section below
          // so you can use functions (and not just JSON) due to a restriction
          // of webpack that serialize/deserialize loader `query` option.
        },
        {
          test: /\.json$/,
          loader: "json-loader",
        },
        {
          test: /\.js$/,
          loaders: [
            `babel-loader${
              config.dev
              ? "?cacheDirectory=true&presets[]=babel-preset-react-hmre"
              : "?cacheDirectory=true"
            }`,
            "eslint-loader?fix",
          ],
          include: [
            path.resolve(__dirname, "scripts"),
            path.resolve(__dirname, "web_modules"),
          ],
        },
        {
          test: /\.css$/,
          exclude: path.resolve(__dirname, "legacy-css"),
          loader: ExtractTextPlugin.extract(
            "style-loader",
            "css-loader" + (
              "?modules"+
              "&localIdentName=" +
              (
                process.env.NODE_ENV === "production"
                ? "[hash:base64:5]"
                : "[path][name]--[local]--[hash:base64:5]"
              ).toString()
            ) + "!" +
            "postcss-loader",
          ),
          include: path.resolve(__dirname, "web_modules"),
        },
        {
          test: /legacy-css(\/|\\).*\.css$/,
          loader: ExtractTextPlugin.extract(
            "style-loader",
          [
            "css-loader",
            "postcss-loader",
          ].join("!"),
          ),
          include: path.resolve(__dirname, "legacy-css"),
        },
        {
          test: /\.(html|ico|jpe?g|png|gif)$/,
          loader: "file-loader" +
            "?name=[path][name].[ext]&context=" +
            path.join(__dirname, config.source),
        },
        {
          test: /\.svg$/,
          loader: "raw-loader",
        },
        {
          test: /\.woff$/,
          loader: "url-loader?limit=30000&name=[path][name].[ext]",
        },
      ],
    },

    phenomic: {
      contentLoader: {
        context: path.join(__dirname, config.source),
        renderer: (text) => (
          markdownIt({
            html: true,
            linkify: true,
            typography: true,
          })
            .use(markdownItTocAndAnchor, {
              tocFirstLevel: 2,
              anchorClassName: "phenomic-HeadingAnchor",
              anchorLinkSymbolClassName: "octicon octicon-link",
              anchorLinkSymbol: "",
            })
            .use(markdownItSub)
            .use(markdownItSup)
            .use(markdownItDeflist)
            .use(markdownItIns)
            .use(markdownItMark)
            .use(markdownItAttrs)
            .use(markdownItFigCaption)
            .use(markdownItContainer, "callout")
            .use(markdownItContainer, "warning")
            .render(text)
        ),
        feedsOptions: {
          title: pkg.name,
          site_url: pkg.homepage,
        },
        feeds: {
          "feed.xml": {
            collectionOptions: {
              filter: { layout: "Post" },
              sort: "date",
              reverse: true,
              limit: 20,
            },
          },
        },
      },
    },

    postcss: () => [
      require("stylelint")(),
      require("postcss-cssnext")({ browsers: "last 2 versions" }),
      require("postcss-browser-reporter")(),
      require("postcss-reporter")(),
      require("lost"),
      require("postcss-font-magician")({
        hosted: "./web_modules/fonts",
      }),
      require("postcss-nested"),
    ],

    plugins: [
      new ExtractTextPlugin("[name].[hash].css", { disable: config.dev }),
      ...config.production && [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(
          { compress: { warnings: false } }
        ),
      ],
    ],

    output: {
      path: path.join(__dirname, config.destination),
      publicPath: config.baseUrl.pathname,
      filename: "[name].[hash].js",
    },

    resolve: {
      extensions: [ ".js", ".json", "" ],
      root: [ path.join(__dirname, "node_modules") ],
    },
    resolveLoader: { root: [ path.join(__dirname, "node_modules") ] },
  }
}

// you might want to export a default config for another usage ?
// export default makeConfig()
