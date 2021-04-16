const User = require('../../models')
const Redis = require('ioredis')
const redis = new Redis()

module.exports = async (req, res, next) => {
  try {
    const { accountId } = req.params
    const {
      userName,
      emailAddress,
      identityNumber
    } = req.body

    
    if (!userName || !emailAddress || !identityNumber) next({ name: 'BlankFill' })
    
    const find_email = await User.validateEmail(emailAddress)
    const find_identity = await User.validateIdentity(identityNumber)

    if (find_email && (req.user.accountNumber !== find_email.accountNumber)) {
      next({ name: 'EmailExist' })
    } else if (find_identity && (req.user.identityNumber !== find_identity.identityNumber)) {
      next({ name: 'IdentityExist' })
    } else {      
      const update_data = await User.update(accountId, {
        userName,
        emailAddress,
        identityNumber
      })
      await redis.del('users')
      res.status(200).json(update_data.value)
    }
  } catch (error) {
    next(error)
  }
}