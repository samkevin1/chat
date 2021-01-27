import React, { useState, useEffect } from 'react';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { Avatar , Button } from '@material-ui/core';

import {
  useRoomContext
} from "../../contexts/Room";
import './index.css';
import api from '../../Services/api';

const ChatLogs = () => {

  const {
    rooms,
    fetchRooms,
    setRooms
  } = useRoomContext();

  const createChat = async () => {

    const roomName = prompt('Please enter name for the chat room');

    if (roomName) {
      const response = await api.post('/room/create', {
        name: roomName,
      });

      const newRoom = response.data.data;
      setRooms(oldState => [...oldState, newRoom]);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [rooms]);

  return (
    <div className='chatLogs'>
      <div className='chatLogs_header'>
        <div className='chatLogs_headerLeft'>
          <p className='chatLogs_chat'>Chat</p>
          <p className='chatLogs_recent'>Recent Chats <KeyboardArrowDownRoundedIcon /></p>
        </div>
        {/*The div below is the "New Chat" Button*/}
        <div onClick={createChat} className='chatLogs_createChat'><AddIcon /> New Chat</div>
      </div>
      <div className='chatLogs_search'>
        <SearchIcon />
        <input
          placeholder='Search'
          type='text'
        />
      </div>
      <div className='chatLogs_messages'>
        {rooms?.map((room) => (
          <Link to={`/rooms/${room._id}`}>
            <div key={room._id} className='chatLogs_message'>
              <div className='chatLogs_messageLeft'>
                <Avatar src={`https://avatars.dicebear.com/4.5/api/human/${Math.floor(Math.random() * 5000)}.svg`} alt='' />
                <h6 className='chatlogs_messageUserName'>{room.name}</h6>
                <p className='chatLogs_timestamp'>1 minute ago</p>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut risus vel diam consectetur aliquam vitae quis mi.</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatLogs;
