bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('../models/user-schema');

module.exports = (app, connection) => {
  app.use(bodyParser.json());

  app.post('/api/generate_token', (req, res) => {
    const data = req.body;
    User.findByUname(data.username, (finderr, user) => {
      if (finderr || !user) return res.status(500).json({ message: 'User not found!' });
      const token = jwt.sign(user, process.env.SECRET_KEY);
      user.password = null;
      res.json({
        token: `Bearer ${token}`,
        user: user
      });
    });
  })
}
