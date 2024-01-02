const express = require('express');
const { getAllNotes, getOneNote, addANote, editNote, deleteNote } = require('../controllers/notesController');
const { validateNotes } = require('../middlewares/schemaValidation');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/all',protect, getAllNotes); // all notes route end-point
router.get('/:id',protect, getOneNote); // get one particular note
router.post('/add',protect, validateNotes,addANote); // add new note to DB
router.put('/edit/:id',protect,validateNotes ,editNote); // edit a particular note (put as we will send the whole data)
router.delete('/delete',protect, deleteNote); // delete a particular note

module.exports = router;