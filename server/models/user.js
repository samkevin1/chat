import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  googleId: String,
  messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'message'}]
});

const User = mongoose.model('User', userSchema);

export default User;