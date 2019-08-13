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



module.exports = server;
