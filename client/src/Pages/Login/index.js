import React from 'react';
import { Button } from '@material-ui/core';

import './index.css';
import {
  useUserContext
} from "../../contexts/User";
import api from '../../Services/api';

const Login = () => {

   const {
    user,
    fetchUser
  } = useUserContext();

  const handleFetchUser = async () => {
    await fetchUser();
  };

  return (
    <div className='login'>
      <img 
        src='' 
        alt="" 
      />
      <Button type='submit' onClick={handleFetchUser}>LOGIN WITH GOOGLE</Button>
    </div>
  );
};

export default Login;