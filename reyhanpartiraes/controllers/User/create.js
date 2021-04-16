const User = require('../../models')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = async (req, res, next) => {
  try {
    const {
      userName,
      emailAddress,
      identityNumber
    } = req.body
  
    const find_email = await User.validateEmail(emailAddress)
    const find_identity = await User.validateIdentity(identityNumber)
    const count_users = await User.find_all()
    
    if (find_email || find_identity) {
      if (find_email) next({ name: 'EmailExist' })
      else next({ name: 'IdentityExist' })
    } else {
      const random_number = Math.ceil(Math.random() * 1e6)
      const accountNumber = `${count_users.length + 1}${random_number}`
      
      const create_user = await User.create({
        userName,
        accountNumber,
        emailAddress,
        identityNumber,
      })
      await redis.del('users')
      res.status(201).json(create_user.ops[0])
    }
  } catch (error) {
    next(error)
  }
}