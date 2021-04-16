const jwt = require('jsonwebtoken')

const generate_token = (payload) => {
  return jwt.sign(payload, 'codeid')
}

const verify_token = (token) => {
  return jwt.verify(token, 'codeid')
}

module.exports = { generate_token, verify_token }