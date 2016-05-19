const Plugin = require("markdown-it-regexp")

const MdFigCaption = Plugin(
    /~\[([^\]]*)\]\(([^\)]*)\)/,
    function(match) {
      const caption = match[1]
      const url = match[2]
      const html = `<figure>
        <img class="jslghtbx-thmb" src="${url}" data-jslghtbx />
        <figcaption>${caption}</figcaption>
      </figure>`

      return html
    }
)

module.exports = MdFigCaption
