const Client = require('./lib/client')
const PDF = require('./lib/pdf')

module.exports = class BreezyPDFLite {
  constructor(config) {
    this.config = Object.assign(config, {
      baseUrl: 'http://localhost:5000'
    })
  }

  async render(html) {
    const client   = new Client(this.config)
    const response = await client.post('/render/html', html)

    return new PDF(response)
  }
}
