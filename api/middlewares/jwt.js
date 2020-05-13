const expressJwt = require('express-jwt');
const userService = require('../user/user.service');
const config = require('../config');

module.exports = jwt;

function jwt() {
  const secret = config.secret;
  return expressJwt({secret, isRevoked})
    .unless({
      path: [
        '/api/user/auth',
        '/api/user/register'
      ]
    });
}

async function isRevoked(req, payload, done) {
  const user = userService.getById(payload.sub);
  if(!user) {
    return done(null, true);
  }

  done();
}