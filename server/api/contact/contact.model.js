'use strict';

import mongoose from 'mongoose';

var ContactSchema = new mongoose.Schema({
  name: String,
  idealContactFrequency: Number,
  minimumContactFrequency: Number,
  interactions: [{
    note: String,
    date: Date,
  }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Contact', ContactSchema);
