const User = require('../../models')

module.exports = async (req, res, next) => {
  try {
    const { queryId } = req.params
    const find_by_account = await User.find_account_number(queryId)
    const find_by_identity = await User.validateIdentity(queryId)

    if (find_by_account || find_by_identity) {
      res.status(200).json(find_by_account || find_by_identity)
    } else {
      next({ name: 'ErrorNotFound' })
    }
  } catch (error) {
    next(error)
  }
}