const { Router } = require('express');
const router = Router();

const { 
    renderNoteForm, 
    createNewNote, 
    renderNotes, 
    renderEditForm, 
    updateNotes, 
    deleteNote 
} = require('../controllers/notes.controllers');

const { isAuthentitated } = require('../helpers/auth');

// New note
router.get('/notes/add', isAuthentitated, renderNoteForm);
router.post('/notes/new-note', isAuthentitated, createNewNote);

//Get all notes
router.get('/notes', isAuthentitated, renderNotes);

//Edit one note
router.get('/notes/edit/:id', isAuthentitated, renderEditForm);
router.put('/notes/edit/:id', isAuthentitated, updateNotes);

//Delete notes
router.delete('/notes/delete/:id', isAuthentitated, deleteNote);


module.exports = router;