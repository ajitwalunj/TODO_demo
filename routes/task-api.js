bodyParser = require('body-parser');
const Task = require('../models/tasks-schema');
const jwt = require('../util/jwt');

module.exports = (app, connection) => {
    app.use(bodyParser.json());

    app.get('/api/task', [jwt.verifyToken], (req, res) => {
        Task.findAll((finderr, findres) => {
            if (finderr) return res.status(400).json({ message: 'Error while finding tasks!' });
            res.send(findres)
        })
    })

    app.post('/api/task', [jwt.verifyToken], (req, res) => {
        const reqData = req.body;
        if (!reqData.name) return res.status(500).json({ message: 'Please send valid task' });
        Task.addOne(reqData, (adderr, addres) => {
            if (adderr || !addres) return res.status(400).json({ message: 'Error while adding task!' });
            res.send({ message: 'Task successfully added' })
        })
    })

    app.delete('/api/task', [jwt.verifyToken], (req, res) => {
        const id = req.query.id;
        if (!id) return res.status(500).json({ message: 'Please send valid id' });
        Task.deleteById(id, (adderr, addres) => {
            if (adderr) return res.status(400).json({ message: 'Error while deleting task!' });
            res.send({ message: 'Task deleted successfully' })
        })
    })
}
