const { getDatabase } = require('../config/mongodb')

class User {
  static find_all() {
    return getDatabase().collection('users').find().toArray()
  }

  static find_account_number(number) {
    return getDatabase().collection('users').findOne({ accountNumber: number })
  }
  
  static create(new_user) {
    return getDatabase().collection('users').insertOne(new_user)
  }

  static update(number, value) {
    return getDatabase().collection('users').findOneAndUpdate({ accountNumber: number }, { $set: value }, { returnOriginal: false })
  }

  static delete(number) {
    return getDatabase().collection('users').deleteOne({ accountNumber: number })
  }

  static validateEmail(email) {
    return getDatabase().collection('users').findOne({ emailAddress: email })
  }

  static validateIdentity(identity) {
    return getDatabase().collection('users').findOne({ identityNumber: identity })
  }
}

module.exports = User