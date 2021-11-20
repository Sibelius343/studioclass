import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const tagSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  color: {
    type: String,
    required: true
  }
})

tagSchema.plugin(uniqueValidator);

export default mongoose.model('Tag', tagSchema);