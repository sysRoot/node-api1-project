const db = require('./data/db');
const morgan = require('morgan');
const express = require('express');

const server = express();

server.use(express.json());
server.use(morgan('default'));

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/api/users', async (req, res, next) => {
    const answer = await db.find();
    try {
        res.status(200).json(answer);
    } catch (err) {
        res.status(500).json('Error fetching users');
    }
});

server.get('/api/users/:id', async (req, res, next) => {
        const answer = await db.findById(req.params.id);
        try {
            res.status(200).json(answer);
        } catch (err) {
            console.log(err);
            res.status(404).json('Error fetching user by ID: not found.');
        }
});

server.post('/api/users', async (req, res, next) => {
    if (req.body) {
        if (req.body.bio && req.body.name) {
            const answer = await db.insert({
                name: req.body.name,
                bio: req.body.bio,
            });
            try {
                res.status(201).json(answer);
            } catch (err) {
                res.status(500).json('There was an error saving the user');
                console.log('failure has occurred', err);
            }
        }
        if (!req.body.name || !req.body.bio) {
            res.status(400).json('Must include Name AND Bio');
        }
    } else {
        res.status(400).json('No body');
    }
});

server.delete('/api/users/:id', async (req, res, next) => {
    const answer = await db.remove(req.params.id);
    try {
        res.status(200).json(`Successfully deleted user with id ${req.params.id}`);
    } catch (err) {
        console.log(err, 'something');
        res.status(404).json('Error deleting user by ID: not found.');
    }
});

module.exports = server;
