import express from 'express';
import room from '../models/room.js';
import message from '../models/message.js';
import HandleResponse from '../helpers/HandleResponse.js';

const router = express.Router();

router.post('/create', (req, res, next) => {
  try {

    const _room = new room({
      name: req.body.name
    });

    _room.save((err, result) => {
      if (err) {
        return res.status(500).json(HandleResponse.internalError('Ocorreu um erro ao tentar cadastrar o usuário.', err));
      }
      res.status(200).json(HandleResponse.success('Sala cadastrado com sucesso.', result));
    });
  }
  catch (err) {
    console.log(err);
    throw Error();
  }
});

router.get('/get-all', (req, res) => {
  room.find((err, data) => {
    if(err){
      return res.status(500).json(
        HandleResponse.internalError('Ocorreu um erro ao tentar buscar as salas.', err));
    }

    return res.status(200).json(HandleResponse.listSuccess('Salas carregadas com sucesso.', data));

  });
});

router.get('/get-messages/:id', (req, res, next) => {
  try{
    message.find().where({ roomId: req.params.id }).exec((err, result) => {
      if (err) {  
        return res.status(500).json(
          HandleResponse.internalError('Ocorreu um erro ao tentar buscar as mensagens do quarto.', err));
      }
      
      return res.status(200).json(HandleResponse.listSuccess('Mensagens da sala carregadas com sucesso.', result));

    });
  } catch (err) {
    console.log(err);
    throw Error();
  }
});

router.get('/get-by-id/:id', (req, res) => {
  try{
    room.findOne().where({ _id: req.params.id }).exec((err, result) => {
      if (err) {  
        return res.status(500).json(
          HandleResponse.internalError('Ocorreu um erro ao tentar buscar a sala', err));
      }
      return res.status(200).json(HandleResponse.success('Sala carregada com sucesso.', result));

    });
  } catch (err) {
    console.log(err);
    throw Error();
  }
});

export default router;