const asyncHandler = require('express-async-handler');

// @desc    Get Notes
// @route   GET /api/notes
// @access  Private
asyncHandler(async function getNotes(req, res) {
  res.status(200).send({ msg: 'Get Notes' });
});

// @desc    Create Note
// @route   POST /api/notes
// @access  Private
asyncHandler(async function createNote(req, res) {
  if (!req.body.title) {
    res.status(400);
    throw new Error('Please add text fields');
  }
  res.status(200).send({ msg: 'Create Note' });
});

// @desc    Update Note
// @route   PUT /api/notes/:id
// @access  Private
asyncHandler(async function updateNote(req, res) {
  res.status(200).send({ msg: `update note ${req.params.id}` });
});

// @desc    Delete Note
// @route   DELETE /api/notes/:id
// @access  Private
asyncHandler(async function deleteNote(req, res) {
  res.status(200).send({ msg: `delete note ${req.params.id}` });
});

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
