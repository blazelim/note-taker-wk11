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


