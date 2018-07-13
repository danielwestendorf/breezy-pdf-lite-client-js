const fs = require('fs')

module.exports = class PDF {
  constructor(response) {
    this.response = response
  }

  toFile(path) {
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(path)

      if (this.response.statusCode !== 201) {
        reject(new Error(`Bad HTTP response ${this.response.statusCode}`))
      }

      file.on('error', reject)
      file.on('finish', () => { resolve(file) })

      this.response.body.on('error', reject)
      this.response.body.pipe(file)
    })
  }

  stream() {
    if (this.response.statusCode !== 201) {
      throw new Error(`Bad HTTP response ${this.response.statusCode}`)
    }

    return this.response.body
  }
}
