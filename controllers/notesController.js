const express = require("express");
const Notes = require("../models/notes");
const asyncHandler = require("express-async-handler");

// To get all notes from the database
module.exports.getAllNotes = asyncHandler(async (req, res) => {
 
    try {
        const allNotes = await Notes.find({author: req.user._id});
        res.status(200).json(allNotes);
    } catch (err) {
        res.status(500).json({ msg: "Error getting the notes", err })
    }
});

// To get particular note from the database
module.exports.getOneNote = asyncHandler(async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(400).json("No note found");
        }
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ msg: "Error getting the note", err })
    }
});

// To add a new note to the database
module.exports.addANote = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    let date = new Date();
    const note = new Notes({
        title, description, date, author: req.user._id
    });
    try {
        const savedNote = await note.save();
        res.status(200).json(savedNote);
    } catch (err) {
        res.status(500).json({ msg: "Error saving the note", err });
    }
});

// To edit a note in the database
module.exports.editNote = asyncHandler(async (req, res) => {
    try {
        let date = new Date();
        const { title, description } = req.body;
        const { id } = req.params;
        const note = await Notes.findOneAndUpdate(
            { _id: id },
            {
                title,
                description,
                date,
            }
        );
        if (!note) {
            return res.status(401).json('The note was not found');
        }
        res.status(200).json({ msg: "Note Edited successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Error Updating the note", err });
    }
});

// To delete a note from the database
module.exports.deleteNote = asyncHandler(async (req, res) => {
    try {
        const note = await Notes.findByIdAndDelete(req.body.id);
        if (!note) {
            return res.status(401).json('The note was not found');
        }
        res.status(200).json({ msg: "Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Error Deleting the note", err });
    }
});
