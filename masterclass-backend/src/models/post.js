import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  audioFiles: [{
    title: {
      type: String,
      required: true
    },
    audioFileUri: {
      type: String,
      required: true
    }
  }],
  description: String,
  dateCreatedAt: {
    type: Date,
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }]
})

export default mongoose.model('Post', postSchema);