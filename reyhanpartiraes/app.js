const express = require('express')
const app = express()
const routes = require('./routes')
const { error_handler } = require('./middlewares')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)
app.use(error_handler)

module.exports = app