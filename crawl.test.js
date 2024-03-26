const { normalizeURL, getURLsFromHTML } = require("./crawl.js")
const { test, expect } = require("@jest/globals")

test("normalizeURL should return a normalized URL without the protocol", () => {
  const input = 'https://blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test("normalizeURL should return a normalized URL without the trailing slashes", () => {
  const input = 'https://blog.boot.dev/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test("normalizeURL should return a URL with lowercase characters", () => {
  const input = 'https://BLog.boot.Dev/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test("normalizeURL should return a URL with 'http' protocol", () => {
  const input = 'http://blog.boot.dev/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test("getURLsFromHTML should return an absolute URL", () => {
  const inputHTMLBody = `
<html>
  <body>
      <a href="https://blog.boot.dev/"><span>Go to Boot.dev</span></a>
  </body>
</html>
`
  const inputBaseURL = "https://blog.boot.dev"
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ["https://blog.boot.dev/"]
  expect(actual).toEqual(expected)
})

test("getURLsFromHTML should return a relative URL", () => {
  const inputHTMLBody = `
<html>
  <body>
      <a href="/path/"><span>Go to Boot.dev</span></a>
  </body>
</html>
`
  const inputBaseURL = "https://blog.boot.dev"
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ["https://blog.boot.dev/path/"]
  expect(actual).toEqual(expected)
})

test("getURLsFromHTML should return multiple relative URLs", () => {
  const inputHTMLBody = `
<html>
  <body>
      <a href="https://blog.boot.dev/path1/"><span>Go to Blog path one</span></a>
      <a href="/path2/"><span>Go to Blog path two</span></a>
  </body>
</html>
`
  const inputBaseURL = "https://blog.boot.dev"
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
  expect(actual).toEqual(expected)
})

test("getURLsFromHTML should return a valid URL", () => {
  const inputHTMLBody = `
<html>
  <body>
      <a href="invalid"><span>Invalid URL</span></a>
  </body>
</html>
`
  const inputBaseURL = "https://blog.boot.dev"
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = []
  expect(actual).toEqual(expected)
})