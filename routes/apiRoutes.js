const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

//GET to fetch the notes
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => 
        res.json(JSON.parse(data))
        );
});

//POST Route to create a new note
router.post('/notes', (req, res) => {
    const newNote = req.body;
    //Assigns an ID to the note
    newNote.id = uuidv4();
    console.log(newNote.id);

    //Pulls current data and pushes new note
    let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    notes.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    console.log("New note pushed");

    res.json(notes);
});

//DELETE route to delete selected note from unique ID created with UUID
router.delete('/notes/:id', (req,res) => {
    //Sets ID as the unique ID of note from the delete request
    let id = req.params.id.toString();
    console.log(id);

    //Sets notes to the current data and then sets updatedNotes to the new data with the selected data filtered out
    let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    const updatedNotes = notes.filter( note => note.id.toString() !== id );

    fs.writeFileSync('./db/db.json', JSON.stringify(updatedNotes));
    res.json(updatedNotes);
})

module.exports = router;