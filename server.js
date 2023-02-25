const express = require('express');

const PORT = 3001; 

const app = express();

app.get('/api/notes', (req,res) => {
    res.json(`${req.method} request received`);

    console.info(req.rawHeaders);

    console.info(`${req.method} request received`);
})