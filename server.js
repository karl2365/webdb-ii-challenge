const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);


const server = express();

server.use(express.json());

server.get('/api/cars', async (req, res) => {
    try {
        const cars = await db('cars');
        res.status(200).json(cars);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to retrieve cars.' });

    }
})

server.post('/api/cars', async (req, res) => {
    try {
        const newCar = req.body;
        if (newCar.vin && newCar.make && newCar.model && newCar.mileage) {
            const [id] = await db('cars').insert(newCar);
            const returnCar = await db('cars').where({ id });
            res.status(201).json(returnCar);
        }
        else {
            res.status(400).json({message: "You must have valid car data!"})
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to store data' });
    }
})

server.put('/api/cars/:id', async (req, res) => {
    try {
        const update = req.body;
        if (update.make && update.model && update.mileage) {
            const count = await db('cars').where('id', '=', req.params.id).update(update);
            res.status(200).json(count);
        }
        else {
            res.status(400).json({message: "You must have valid car data!"})
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to update data' });
    }
})

server.delete('/api/cars/:id', async (req, res) => {
    try {
        const count = await db('cars').where('id', '=', req.params.id).del();
        if (count > 0){
            res.status(200).json(count);
        }
        else {
            res.status(404).json({ message: 'not found' });
        }    
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete data' });

    }
})

module.exports = server;
