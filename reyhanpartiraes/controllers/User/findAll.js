const User = require('../../models')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = async (req, res, next) => {
  try {
    const cache = await redis.get('users')
    if (cache) res.status(200).json(JSON.parse(cache))
    else {
      const find_all_users = await User.find_all()
      await redis.set('users', JSON.stringify(find_all_users))
      res.status(200).json(find_all_users)
    }
  } catch (error) {
    next(error)
  }
}