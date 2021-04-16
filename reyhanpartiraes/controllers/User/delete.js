const User = require('../../models')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = async (req, res, next) => {
  try {
    const { accountId } = req.params
    await User.delete(accountId)
    await redis.del('users')
    res.status(200).json('User deleted')
  } catch (error) {
    next(error)
  }
}