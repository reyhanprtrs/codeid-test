const route = require('express').Router()
const user_route = require('./User')

route.use('/', user_route)

module.exports = route