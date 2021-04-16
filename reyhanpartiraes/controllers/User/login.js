const User = require('../../models')
const { generate_token } = require('../../helpers')

module.exports = async (req, res, next) => {
  try {
    const {
      accountNumber,
      identityNumber
    } = req.body

    if (!accountNumber && !identityNumber) next({ name: 'InvalidAccount' })

    const find_user = await User.find_account_number(accountNumber)

    if (!find_user) next({ name: 'InvalidAccount' })
    else {
      if (identityNumber !== find_user.identityNumber) next({ name: 'InvalidAccount' })
      else {
        const payload = { accountNumber: find_user.accountNumber, identityNumber: find_user.identityNumber }
        const access_token = generate_token(payload)
        res.status(200).json({access_token})
      }
    }
  } catch (error) {
    next(error)
  }
}