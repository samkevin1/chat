import React, { createContext, useContext, useState } from 'react';
import firebase from 'firebase';

import api from '../../Services/api';
import { auth, provider } from '../../Services/firebase';

export const UserContext = createContext();

export const  TOKEN = 'chat-messenger-token';

export const UserContextProvider = ({ children }) => {
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});
  const user = firebase.auth()?.currentUser;
  const [token, setToken] = useState('');

  const fetchUser = async () => {
    
    setLoading(l => ({...l, user: true}));

    try {
      

    } catch (err) {
      setErrors(e => ({ ...e, user: String(err) }));
      setLoading(l => ({ ...l, user: false }));
    }
    setLoading(l => ({ ...l, user: false }));
  }

  return <UserContext.Provider value={{
    loading,
    errors,
    user,
    fetchUser,
    token
  }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw Error("useUserContext must be in UserContextProvider");
    }

    return context;
};