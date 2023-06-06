const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Welcome to my project!');
});

module.exports = routes;
