const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const url = req.url
  let body = ''
  req.on('data', async chunk => {
    body = await body + chunk.toString();
  }).on('end', () => {
    switch (url) {
      case '/':
        const data = fs.readFileSync('./public/index.html')
        res.writeHead(res.statusCode, {
          "Content-Type": "text/html"
        })
        // res.write(data)
        res.end(data)
        break
      default:
        const obj = {
          message: 'Not found',
          status: 404
        }
        res.end(JSON.stringify(obj))
        break
    }
  })
})

server.listen(8080, () => {
    console.log('port listening on 8080')
})