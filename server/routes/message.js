import express from 'express';
import message from '../models/message.js';
import user from '../models/user.js';
import room from '../models/room.js';
import HandleResponse from '../helpers/HandleResponse.js';

const router = express.Router();

router.post('/create', async (req, res, next) => {
  try {

    const roomId = req.body.roomId;
    const userEmail = req.body.userEmail;

    const _message = new message({
      content: req.body.content,
      userEmail: userEmail,
      roomId: roomId,
      timestamp: req.body.timestamp
    });

    await _message.save( async (err, result) => {
      if (err) {
        return res.status(500).json(HandleResponse.internalError('Ocorreu um erro ao tentar cadastrar a mensagem.', err));
      }
      const userByEmail = await user.find().where({ email: userEmail });
      userByEmail[0]?.messages.push(_message);
      userByEmail[0].save();

      const roomById = await room.findById(roomId);
      roomById.messages.push(_message);
      await roomById.save();

      res.status(200).json(HandleResponse.success('Mensagem salva com sucesso', result));
    });

  }
  catch (err) {
    console.log(err);
    throw Error();
  }
});

router.get('/get-all', (req, res) => {
  message.find((err, data) => {
    if(err){
      return res.status(500).json(HandleResponse.internalError('Ocorreu um erro ao tentar bsucar as mensagens.', err));
    }

    return res.status(200).json(HandleResponse.listSuccess('Mensagens carregadas com sucesso.', data));

  });
});

export default router;