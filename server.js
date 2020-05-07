const db = require('./data/db');

const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/api/users', async (req, res, next) => {
    const answer = await db.find();
    res.status(200).json(answer);
});

server.post('/api/users', async (req, res, next) => {
    if (req.body) {
        if (req.body.bio && req.body.name) {
            const answer = await db.insert({
                name: req.body.name,
                bio: req.body.bio,
            });
            try {
                res.status(200).json(answer);
            } catch (err) {
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

module.exports = server;
