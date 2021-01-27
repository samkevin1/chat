import React, { createContext, useContext, useState } from 'react';
import firebase from 'firebase';

import api from '../../Services/api';
import { auth, provider } from '../../Services/firebase';

export const RoomContext = createContext();

export const RoomContextProvider = ({ children }) => {
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState([]);

  const fetchRooms = async () => {
    
    setLoading(l => ({...l, rooms: true}));

    try {
      const response = await api.get('/room/get-all');
      setRooms(response.data.data);

    } catch (err) {
      setErrors(e => ({ ...e, rooms: String(err) }));
      setLoading(l => ({ ...l, rooms: false }));
    }
    setLoading(l => ({ ...l, rooms: false }));
  }

  const fetchRoomMessages = async (id) => {
    
    setLoading(l => ({...l, rooms: true}));

    try {
      const response = await api.get(`/room/get-messages/${id}`);
      setMessages(response.data.data);

    } catch (err) {
      setErrors(e => ({ ...e, rooms: String(err) }));
      setLoading(l => ({ ...l, rooms: false }));
    }
    setLoading(l => ({ ...l, rooms: false }));
  }

  const fetchRoom = async (id) => {
    
    setLoading(l => ({...l, rooms: true}));

    try {
      const response = await api.get(`/room/get-by-id/${id}`);
      setRoom(response.data.data);

    } catch (err) {
      setErrors(e => ({ ...e, rooms: String(err) }));
      setLoading(l => ({ ...l, rooms: false }));
    }
    setLoading(l => ({ ...l, rooms: false }));
  }

  return <RoomContext.Provider value={{
    loading,
    errors,
    rooms,
    fetchRooms,
    setRooms,
    fetchRoomMessages,
    messages,
    fetchRoom,
    room
  }}>{children}</RoomContext.Provider>;
};

export const useRoomContext = () => {
    const context = useContext(RoomContext);

    if (!context) {
        throw Error("useRoomContext must be in RoomContextProvider");
    }

    return context;
};