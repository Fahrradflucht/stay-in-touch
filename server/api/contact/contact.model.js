'use strict';

import mongoose from 'mongoose';

var ContactSchema = new mongoose.Schema({
  name: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model('Contact', ContactSchema);
