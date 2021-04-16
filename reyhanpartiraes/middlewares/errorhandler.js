module.exports = (err, req, res, next) => {
  const objErr = (code, message) => {
    return res.status(code).json({
      status: 'Error',
      name: err.name,
      message: message
    })
  }
  switch (err.name) {
    case 'BlankFill':
      objErr(400, `All fields can't be blank.`)
    case 'EmailExist':
      objErr(400, 'Email has been used.')
      break;
    case 'IdentityExist':
      objErr(400, 'Identity number has been used.')
      break;
    case "InvalidAccount":
      objErr(401, 'Wrong account/identity number.')
      break;
    case "ErrorAuthenticate":
      objErr(401, 'Please sign in first.')
      break;
    case "ErrorAuthorize":
      objErr(403, `You don't have access.`)
      break;
    case "ErrorAccessToken":
      objErr(403, 'JWT needed.')
      break;
    case "ErrorNotFound":
      objErr(404, 'Not found.')
      break;
    default:
      res.status(500).json({
        status: 'Error',
        error: err
      })
      break;
  }
}