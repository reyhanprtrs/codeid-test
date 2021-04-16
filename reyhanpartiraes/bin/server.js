const app = require('../app')
const http = require('http')
const { connect } = require('../config/mongodb')
const port = process.env.PORT || 3000
const server = http.createServer(app)

connect().then((db) => {
  server.listen(port, () => console.log(`this app running at ${port}`))
})