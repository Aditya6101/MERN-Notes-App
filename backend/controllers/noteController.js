const asyncHandler = require('express-async-handler');

const Note = require('../models/noteModel');

// @desc    Get Notes
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find();

  res.status(200).send(notes);
});

// @desc    Create Note
// @route   POST /api/notes
// @access  Private
const createNote = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('Please add text fields');
  }

  const { title, desc, text } = req.body;
  const note = await Note.create({
    title,
    desc,
    text,
  });

  res.status(201).send(note);
});

// @desc    Update Note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error('Note not found');
  }
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).send(updatedNote);
});

// @desc    Delete Note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error('Note not found');
  }
  await note.remove();

  res.status(200).send({ id: req.params.id });
});

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
