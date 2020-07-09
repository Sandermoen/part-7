const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  author: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: String,
    },
  ],
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model('blog', blogSchema);
module.exports = Blog;
