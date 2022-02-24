const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title value'],
    },
    desc: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);
