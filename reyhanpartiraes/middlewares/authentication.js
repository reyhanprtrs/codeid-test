const User = require('../models')
const { verify_token } = require('../helpers')

module.exports = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    if (!access_token) next({ name: 'ErrorAccessToken' })
    else {
      const decoded = verify_token(access_token)
      const user = await User.find_account_number(decoded.accountNumber)
      if (!user) next({ name: 'ErrorAuthenticate' })
      else {
        req.user = { accountNumber: user.accountNumber, identityNumber: user.identityNumber }
        next()
      }
    }
  } catch (error) {
    next(error)
  }
}