'use strict';

import mongoose from 'mongoose';

var ContactSchema = new mongoose.Schema({
  name: String
});

export default mongoose.model('Contact', ContactSchema);
