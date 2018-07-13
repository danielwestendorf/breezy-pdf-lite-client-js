const assert = require('assert')
const fs     = require('fs')
const PDF    = require('../../lib/pdf')

module.exports = {
  beforeEach() {
    this.response = {
      body: fs.createReadStream('./index.js')
    }

    this.pdf = new PDF(this.response)
  },

  stream: {
    resolvesReadStream() {
      this.response.statusCode = 201

      const stream = this.pdf.stream()

      assert.equal('Function', stream.pipe.constructor.name)
    },

    throwsErrorWithBaddHttpResponse() {
      this.response.statusCode = 500

      try {
        this.pdf.stream()
      } catch (err) {
        assert.equal(`Error: Bad HTTP response ${this.response.statusCode}`, err)
      }
    }
  },

  toFile: {
    async resolvesAFile(done) {
      this.response.statusCode = 201

      const tempFile = await this.pdf.toFile('/tmp/temp.pdf')

      assert.equal('WriteStream', tempFile.constructor.name)
      done()
    },

    async badHttpResponse(done) {
      this.response.statusCode = 500
      try {
        await this.pdf.toFile('/tmp/temp.pdf')
      } catch (err) {
        assert.equal(`Error: Bad HTTP response ${this.response.statusCode}`, err)
        done()
      }
    },

    async errorFromResponseStream(done) {
      const response = {
        body:       fs.createReadStream('./index2.js'),
        statusCode: 201
      }

      const pdf = new PDF(response)

      try {
        await pdf.toFile('/tmp/temp.pdf')
      } catch (err) {
        assert.equal('Error: ENOENT: no such file or directory, open \'./index2.js\'', err)
        done()
      }
    },

    async errorWritingToFile(done) {
      this.response.statusCode = 201

      try {
        await this.pdf.toFile('/badpath/temp.pdf')
      } catch (err) {
        assert.equal('Error: ENOENT: no such file or directory, open \'/badpath/temp.pdf\'', err)
        done()
      }
    }
  }
}
