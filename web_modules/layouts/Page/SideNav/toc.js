import cheerio from "cheerio"

export default function(body) {
  const $ = cheerio.load(body)
  const toc = $("ul.markdownIt-TOC")[0]
  $(toc).remove()
  const newBody = $.html()
  const newToc = $(toc).html()
  return { body: newBody, toc: newToc }
}
