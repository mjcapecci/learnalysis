const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  sortDate: {
    type: Date,
    required: true
  },
  editDate: {
    type: String
  },
  edited: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: true
  },
  medium: {
    type: String,
    enum: ['Video', 'Book', 'Article'],
    required: true
  },
  timeSpent: {
    hours: {
      type: Number,
      required: true
    },
    minutes: {
      type: Number,
      required: true
    }
  },
  summary: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 3,
    default: 1,
    validate: {
      validator: Number.isInteger
    }
  },
  researchOnly: {
    type: Boolean,
    default: false
  },
  description: {
    type: String
  }
});

EntrySchema.index({
  description: 'text',
  summary: 'text',
  category: 'text'
});

module.exports = Entry = mongoose.model('entry', EntrySchema);
