import mongoose from 'mongoose';
import pusher from './pusher.js';

const db = mongoose.connection;

db.once('open', () => {
  console.log("Db connected");

  const msgCollection = db.collection('messages');
  const changeStream = msgCollection.watch();

  changeStream.on('change', (change) => {

    if(change.operationType === 'insert'){
      const messageDetails = change.fullDocument;
      pusher.trigger('messages', 'inserted',
        {
          content:messageDetails.content,
          timestamp:messageDetails.timestamp,
          roomId:messageDetails.roomId,
          userId:messageDetails.userId
        }
      );
    }else{
      console.log('Error triggering pusher');
    }
  })
});

export default db;