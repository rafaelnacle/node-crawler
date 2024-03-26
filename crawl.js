const { JSDOM } = require('jsdom')

async function crawlPage(currentURL) {
  console.log(`Actively crawling: ${currentURL}`);

  try {
    const response = await fetch(currentURL)
    if (response.status > 390) {
      console.error(`error in fetch with status code: ${response.status} on page: ${currentURL}`);
      return
    }

    const contentType = response.headers.get("content-type")
    if (!contentType.includes("text/html")) {
      console.error(`non html response, content type: ${contentType}, on page: ${currentURL}`);
      return
    }

    console.log(await response.text());
  } catch (error) {
    console.error(`error in fetch: ${error.message}, on page: ${currentURL}`)
  }
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = []
  const dom = new JSDOM(htmlBody)
  const linkElements = dom.window.document.querySelectorAll('a')
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === '/') {
      // relative url
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`)
        urls.push(urlObj.href)
      } catch (error) {
        console.error(`error with relative url: ${error.message}`)
      }
    } else {
      // absolute url
      try {
        const urlObj = new URL(linkElement.href)
        urls.push(urlObj.href)
      } catch (error) {
        console.error(`error with absolute url: ${error.message}`)
      }
    }
  }
  return urls
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString)
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`
  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
    return hostPath.slice(0, -1)
  }
  return hostPath
}

module.exports = {
  crawlPage,
  normalizeURL,
  getURLsFromHTML
}