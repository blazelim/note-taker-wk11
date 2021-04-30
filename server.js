const express = require('express');

// import the database
const {notes} = require('./db/db')

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
    let results = notes;

    res.json(results);
})

// TODO function for deleting a note, get id, splice out of array, reset all id numbers 
function idReassignment(objArray) {
    let edittedArray = notes;
    for (var i = 0; i < edittedArray.length; i++) {
        let updatedIndex = i;
        let stringifiedIndex = updatedIndex.toString();
        edittedArray[i].id = stringifiedIndex;
    }

    return edittedArray;
};


// function for note validation
function validateNote(note) {
    if (!note.title) {
      return false;
    }
    if (!note.text) {
       return false;
    }
    return true;
}


// function for creating notes
function createNewNote(body, notes) {
    const note = body;
    notes.push(body);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notes}, null, 2)
    );
    // return finished code to post route for response
    return note;
}

// function for find by id
function findById(id, noteArray) {
    const results = noteArray.filter(note => note.id === id)[0];
    return results;
};

// api routes
// api route for entire database and query search
app.get('/api/notes', (req,res) => {
    let placeholderDB = notes;
    res.json(placeholderDB);
})

// api route for specific id
app.get('/api/notes/:id', (req, res) => {
    const results = findById(req.params.id, notes);
    if (results) {
        res.json(results);
    } else {
        res.send(404);
    }
});

// api post route
app.post('/api/notes', (req, res) => {

    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    // add note to json file and notes array in this function
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);

        res.json(note);
    }
});

// api delete route
app.delete('/api/notes/:id', (req, res) => {
    let target = req.params.id;
    let oldNotesArray = notes;
    let removedNotesArray = oldNotesArray.splice(target, 1);
    let newNotesArray = idReassignment(removedNotesArray);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: newNotesArray}, null, 2)
    );

    res.json(newNotesArray);
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