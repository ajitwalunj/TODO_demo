const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Users = sequelize.define('Users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
    timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
}, {
    freezeTableName: true,
    timestamps: false
});

Users.sync({ alter: true });

module.exports.addOne = (users, callback) => {
    Users.create(users).then((response) => {
        callback(null, response)
    }).catch((err) => {
        if (err) {
            callback(err, null)
        }
    })
}

module.exports.findById = (id, callback) => {
    Users.findOne({ where: { id } }).then((response) => {
        callback(null, response)
    }).catch((err) => {
        if (err) {
            callback(err, null)
        }
    })
}

module.exports.findByUname = (username, callback) => {
    Users.findOne({ where: { username } }).then((response) => {
        callback(null, response)
    }).catch((err) => {
        if (err) {
            callback(err, null)
        }
    })
}