const path = require('path');
const router = require('express').Router();


//Sets any other routes to direct to index.html
router.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


//Sets the route for notes.html for "GET"
router.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

module.exports = router;