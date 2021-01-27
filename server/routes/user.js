import express from 'express';
import message from '../models/message.js';
import user from '../models/user.js';
import HandleResponse from '../helpers/HandleResponse.js';

const router = express.Router();

router.post('/create', (req, res, next) => {
  try {
    const _user = new user({
      name: req.body.name,
      email: req.body.email,
    });

    user.findOne().where({ 'email': _user.email }).exec((err, result) => {
      if (err) {
        return res.status(500).json(
          HandleResponse.internalError('Ocorreu um erro ao tentar cadastrar o usuário.', err));
      }
      
      if (result === null) {
        _user.save((err, result) => {
          if (err) {
            return res.status(500).json(HandleResponse.internalError('Ocorreu um erro ao tentar cadastrar o usuário.', err));
          }
          res.status(200).json(HandleResponse.success('Usuário cadastrado com sucesso.', result));
        });
      } else {
        return res.status(200).json(HandleResponse.logicalError('Já existe um usuário cadastrado com esse email.', _user.email));
      }
    });
  }
  catch (err) {
    console.log(err);
    throw Error();
  }
});

router.get('/get-all', (req, res) => {
  user.find((err, data) => {
    if(err){
      return res.status(500).json(
        HandleResponse.internalError('Ocorreu um erro ao tentar buscar os usuários.', err));
    }

    return res.status(200).json(HandleResponse.listSuccess('Usuários carregados com sucesso.', data));

  });
});

router.get('/get-messages/:email', (req, res, next) => {
  try{
    message.find().where({ userEmail: req.params.email }).exec((err, result) => {
      if (err) {  
        return res.status(500).json(
          HandleResponse.internalError('Ocorreu um erro ao tentar buscar as mensgens do usuário.', err));
      }

      return res.status(200).json(HandleResponse.listSuccess('Mensagens do usuário carregados com sucesso.', result));

    });
  } catch (err) {
    console.log(err);
    throw Error();
  }
});

export default router;