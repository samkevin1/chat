import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
  name: String,
  messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'message'}]
});

const Room = mongoose.model('Room', roomSchema);

export default Room;