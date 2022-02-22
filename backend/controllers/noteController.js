// @desc    Get Notes
// @route   GET /api/notes
// @access  Private
function getNotes(req, res) {
  res.status(200).send({ msg: 'Get Notes' });
}

// @desc    Create Note
// @route   POST /api/notes
// @access  Private
function createNote(req, res) {
  console.log(req.body);
  res.status(200).send({ msg: 'Create Note' });
}

// @desc    Update Note
// @route   PUT /api/notes/:id
// @access  Private
function updateNote(req, res) {
  res.status(200).send({ msg: `update note ${req.params.id}` });
}

// @desc    Delete Note
// @route   DELETE /api/notes/:id
// @access  Private
function deleteNote(req, res) {
  res.status(200).send({ msg: `delete note ${req.params.id}` });
}

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
