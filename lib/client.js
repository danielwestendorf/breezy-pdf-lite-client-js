/* global fetch:true */

require('es6-promise').polyfill()
require('isomorphic-fetch')

module.exports = class Client {
  constructor(config) {
    this.config = config
  }

  post(path, body) {
    const url = this.config.baseUrl + path

    return fetch(url, {
      method:  'POST',
      body:    body,
      headers: {
        'Authorization': `Bearer: ${this.config.secretApiKey}`
      }
    })
  }
}
