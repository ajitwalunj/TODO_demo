'use strict';
const jwt = require('jsonwebtoken');
const User = require('../models/user-schema');

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader || bearerHeader == 'undefined' || bearerHeader == undefined) return res.status(403).send({ message: 'Forbidden' });
  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];
  jwt.verify(bearerToken, process.env.SECRET_KEY, (err, authData) => {
    if (err) return res.status(403).send({ message: 'Forbidden' });
    User.findById(authData.id, (findErr, user) => {
      if (findErr) res.status(400).json({ message: 'Error while verifying token. Please try again.' });
      if (!user) res.status(400).json({ message: 'Invalid token. User not found.' });
      req.authData = authData;
      next();
    });
  })
}



module.exports = {
  verifyToken
}