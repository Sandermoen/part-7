const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  name: String,
  password: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'blog',
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const User = mongoose.model('user', userSchema);
module.exports = User;
