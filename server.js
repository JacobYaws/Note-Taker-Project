const express = require('express');
const path = require('path');
const fs = require('fs');
// const util = require('util');
const PORT = 3001; 
const db = require('./db/db')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));

app.get('/api/notes', (req,res) => {
    res.status(200).json(db);
    console.log(db);
    fs.readFile('./db/db.json', "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed", err);
            return;
        }
        console.log("File data:", jsonString);
    })
    // res.json(`${req.method} request received`);

    console.info(req.rawHeaders);

    console.info(`${req.method} request received`);
})

app.post('/api/notes', (req,res) => {
    const note = req.body;
    console.info(`${req.method} request received`);
    // if (err) {
    //     console.log(res.status(500).json('Error in saving new note'));
    //     console.log(err);
    // } 
        try {
        const noteString = JSON.stringify(note);
        fs.appendFileSync(`./db/db.json`, noteString, (err) =>
        err
            ? console.error(err)
            : console.log(
                `New note '${note.product}' has been written to JSON file`
            ))
        const response = {
            status: 'success',
            body: note,
        }
        console.log(response);
        res.status(201).json(note);
        
    } 
    catch (err) {
        console.log(res.status(500).json('Error in saving new note'));
        console.log(err);
    }
    
});

app.delete('/api/notes/:id', (req, res) => {

})

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.listen(PORT, function() {
    console.log(`App listening at http://localhost:${PORT}`);
})

