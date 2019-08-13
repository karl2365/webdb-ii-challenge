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


module.exports = server;
