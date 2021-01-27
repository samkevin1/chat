import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { IconButton } from '@material-ui/core';
import {
  useParams
} from "react-router-dom";
import firebase from 'firebase';

import './index.css';
import {
  useRoomContext
} from "../../contexts/Room";
import api from '../../Services/api';


const Chat = () => {

  const user = firebase.auth().currentUser;

  const {
    messages,
    fetchRooms,
    setRooms,
    room,
    fetchRoomMessages,
    fetchRoom
  } = useRoomContext();

  const { roomId } = useParams();
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    await api.post('/message/create', {
      userEmail: user.email,
      roomId: roomId,
      content: input
    });
    setInput('');
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    fetchRoom(roomId);
  }, [roomId]);

  useEffect(() =>{
    fetchRoomMessages(roomId);
  }, [messages]);

  return (
    <div className='chat'>
      <div className='chat_chat'>
        <div className='chat_header'>
          <Avatar  src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg`} alt='' />
          <div className='chat_headerLeft'>
            <h6>{room.name}</h6>
            <p>Last seen...</p>
          </div>
          <div className='chat_headerRight'>
            <AttachFileIcon />
            <MoreVertRoundedIcon />
          </div>
        </div>
        <div className='chat_body'>
          {messages?.map((message) => (
            <div key={message._id} className='chat_messageBox'>
              <div className={user.email === message.userEmail ? 'chat_message' : 'chat_messageReceived'}>
                <p>{message.content}</p>
              </div>
              <MoreHorizRoundedIcon />
            </div>
          ))}
        </div>
        <hr />
        <div className='chat_footer'>
          <form className='chat_input'>
            <input
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder='Type a message here...'
              type='text'
            />
            <IconButton onClick={sendMessage} type='submit'>
              <SendRoundedIcon />
            </IconButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
