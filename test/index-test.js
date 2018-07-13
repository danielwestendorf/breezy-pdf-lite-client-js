/* global td:true */

const assert = require('assert')
const PDF    = require('../lib/pdf')

let BreezyPDFLite

module.exports = {
  beforeEach() {
    td.replace('../lib/client')
    BreezyPDFLite = require('../index.js')
  },

  async render() {
    const breezyPdfLite = new BreezyPDFLite({})
    const pdf = await breezyPdfLite.render('blah')

    assert.equal(PDF, pdf.constructor)
  }
}
