const express = require('express');

const routes = express.Router();

routes.post('/message', (req, res) => {
    const { message } = req.body;
    const { recipient } = req.body;
    const { sender } = req.body;
    req.io.to().emit('message', { message, recipient, sender });
});

module.exports = routes;