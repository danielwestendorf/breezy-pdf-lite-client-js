# BreezyPDFLite

A javascript client for [BreezyPDFLite](https://github.com/danielwestendorf/breezy-pdf-lite), a one-click-to-deploy microservice for converting HTML to PDF with Google Chrome. Send the library a chunk of HTML, get a PDF of it back. Configure how the PDF is rendered via [`meta` tags](https://github.com/danielwestendorf/breezy-pdf-lite#2-configure-with-meta-tags-optional) in the HTML.

Use pragmatically, or as a Rack Middleware.

## Installation

TODO

## Usage

### Pragmatic Usage

```javascript
const BreezyPDFLite = require('breezy-pdf-lite-client')

const breezyPDFLite = new BreezyPDFLite({
  baseUrl: 'https://YOURINSTANCEOFBREEZYPDFLITE.herokuapp.com',
  secretApiKey: 'YOURSECRETAPIKEYFROMYOURINSTANCE'
})

await pdf = breezyPDFLite.render('<html>....</html>')


// Download as a file
const file = await pdf.toFile('path')

// Direct Readable Stream
const stream = pdf.stream()
stream.pipe(yourWritableStream)
```


## License

See `LICENSE`.
