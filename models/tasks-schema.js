const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Tasks = sequelize.define('Tasks', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
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
Tasks.sync({ alter: true });

module.exports.addOne = (Task, callback) => {
    Tasks.create(Task).then((response) => {
        callback(null, response)
    }).catch((err) => {
        if (err) {
            callback(err, null)
        }
    })
}

module.exports.findById = (id, callback) => {
    Tasks.findOne({ where: { id } }).then((response) => {
        callback(null, response)
    }).catch((err) => {
        if (err) {
            callback(err, null)
        }
    })
}

module.exports.findAll = (callback) => {
    Tasks.findAll().then((response) => {
        callback(null, response)
    }).catch((err) => {
        callback(err, null)
    })
}

module.exports.deleteById = (id, callback) => {
    console.log('id', id)
    Tasks.destroy({ where: { id } }).then((response) => {
        callback(null, response)
    }).catch((err) => {
        callback(err, null)
    })
}
