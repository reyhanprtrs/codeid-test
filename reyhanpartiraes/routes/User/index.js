const route = require('express').Router()
const { UserController } = require('../../controllers')
const { authentication, authorization } = require('../../middlewares')

route.post('/', UserController.create)
route.post('/login', UserController.login)
route.use(authentication)
route.get('/:queryId', UserController.find_by_num)
route.use('/accountId', authorization)
route.put('/:accountId', UserController.update)
route.delete('/:accountId', UserController.delete)

module.exports = route