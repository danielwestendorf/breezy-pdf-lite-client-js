const assert = require('assert')
let Client

module.exports = {
  beforeEach() {
    global.fetch = td.function('fetch')
    Client       = require('../../lib/client')
  },

  async post(done) {
    const client = new Client({
      baseUrl: 'https://example.com',
      secretApiKey: '123abc'
    })

    td.when(global.fetch('https://example.com/foo', {
      method:  'POST',
      body:    'blah',
      headers: {
        'Authorization': `Bearer: 123abc`
      }
    })).thenResolve('bar')

    let response = await client.post('/foo', 'blah')
    assert.equal('bar', response)
    done()
  }
}
