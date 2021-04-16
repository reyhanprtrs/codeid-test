const e = require("express")

module.exports = async (req, res, next) => {
  try {
    const { accountId } = req.params
    if (req.user.accountNumber === accountId) next()
    else next({ name: 'ErrorAuthorize' })
  } catch (error) {
    next(error)
  }
}