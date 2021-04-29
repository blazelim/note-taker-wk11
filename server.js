const express = require('express');

// need fs to save notes
const fs = require('fs');

// path to conjoin paths
const path = require('path');

// setting port functionality
const PORT = process.env.PORT || 3001;
const app = express();

// allows html to use css sheet
app.use(express.static('public'));

//adding middleware
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// api routes
app.get('/api/notes', (req, res) => {
    let results = savedNotes;

    res.json(results);
})


// html routes
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// html catch all
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});