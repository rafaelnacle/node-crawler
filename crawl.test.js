const { normalizeURL } = require("./crawl.js")
const { test, expect } = require("@jest/globals")

test("normalizeURL function should return a normalized URL without the protocol", () => {
  const input = 'https://blog.boot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test("normalizeURL function should return a normalized URL without the trailing slashes", () => {
  const input = 'https://blog.boot.dev/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test("normalizeURL function should return a normalized URL without capitals", () => {
  const input = 'https://BLog.boot.Dev/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test("normalizeURL function should return a normalized URL with http", () => {
  const input = 'http://blog.boot.dev/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

