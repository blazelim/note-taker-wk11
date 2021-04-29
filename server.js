const express = require('express');

// import the database
const {savedDB} = require('./db/db.json')

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

// function for note validation
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.body || typeof note.body !== 'string') {
       return false;
    }


    return true;
}
// TODO function for updating notes

// function for creating notes
function createNewNote(body, savedDB) {
    const note = body;
    savedDB.push(body);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: savedDB}, null, 2)
    );
    // return finished code to post route for response
    return animal;
}

// function for find by id
function findById(id, noteArray) {
    const results = noteArray.filter(note => note.id === id)[0];
    return results;
};

// api routes
// api route for entire database and query search
app.get('/api/notes', (req,res) => {
    let placeholderDB = savedDB;
    res.json(placeholderDB);
})

// api route for specific id
app.get('/api/notes/:id', (req, res) => {
    const results = findById(req.params.id, savedDB);
    if (results) {
        res.json(results);
    } else {
        res.send(404);
    }
});
// api post route
app.post('/api/notes', (req, res) => {

    // set id based on what the next index of the array wil lbe
    req.body.id = savedDB.length.toString();

    // add note to json file and notes array in this function
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
    const note = createNewNote(req.body, savedDB);

    res.json(note);
}
});
// TODO api route for updating json


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