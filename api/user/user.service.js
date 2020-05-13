const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../user/user.model');

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete
}

async function authenticate({ username, password }) {
  console.log('trying to authenticate');
  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.id }, config.secret);
    return {
      ...user.toJSON(),
      token
    }
  }
}

async function getAll() {
  return await User.find();
}

async function getById(id) {
  return await User.findById(id);
}

async function create(params) {
  if (await User.findOne({ username: params.username })) {
    throw `Username "${params.username}" is already taken`;
  }

  const user = new User(params);

  if(params.password) {
    user.hash = bcrypt.hashSync(params.password, 10);
  }

  await user.save();
}

async function update(id, params) {
  const user = await User.findById(id);
  if(!user) throw new 'User not found';
  if(params.username && await User.find({ username: params.username })) {
    throw new `Username "${params.name}" is already taken`;
  }

  if(params.password) {
    user.hash = bcrypt.hashSync(params.password, 10);
  }

  Object.assign(user, params);

  await user.save();
}

async function _delete(id) {
  await User.findByIdAndRemove(id);
}