var server = require('http').createServer(router)
var io = require('socket.io')(server)
var fs = require('fs')

const onListening = () => {
  const { port } = server.address()
  console.log(`listening at http://localhost:${port}`)
}

server.listen({
  port: 80,
}, onListening)

const handleNotify = (req, res) => {
  const chunks = []
  req.on('data', (chunk) => {
    chunks.push(chunk)
  })

  req.on('end', () => {
    const rawFileText = Buffer.concat(chunks).toString('utf8')
    console.log(`notify: length ${rawFileText.length}`)
    io.emit('message-from-server', {
      code: rawFileText,
    })
    res.end()
  })
}

function router(req, res) {
  if (req.url === '/notify') {
    handleNotify(req, res)
  } else {
    fs.readFile(__dirname + '/index.html', function (err, data) {
      if (err) {
        res.writeHead(500)
        return res.end('Error loading index.html')
      }

      res.writeHead(200)
      res.end(data)
    })
  }
}

io.on('connection', function (socket) {
  console.log('connection open')

  socket.on('disconnect', () => {
    console.log('connection gone')
  })
})

