import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './App.css';
import Chat from './Components/Chat';
import ChatLogs from './Components/ChatLogs';
import Sidebar from './Components/Sidebar';
import Contexts from './contexts';
import Login from './Pages/Login'
import {
  useUserContext
} from "./contexts/User";
import api from './Services/api';
import { auth, provider } from './Services/firebase';

function App() {

  const [_user, setUser] = useState(undefined);

  /*useEffect(() => {
    api.get('/user/get-all').then(async (res) => {
      console.log(res.data);
    })
  },[]);*/

  useEffect(() => {
    auth
    .signInWithPopup(provider)
    .then((result) => {
      setUser(result.additionalUserInfo.profile);
    })
    .catch((err) => alert(err.message));
  }, [])
    

  return (
    <Contexts>
      
        {_user === undefined ? (
          <Login />
        ) : (
          <div className="app">
            <Router>
              <Sidebar />
              <ChatLogs />
              <Switch>
                <Route path="/rooms/:roomId">
                    <Chat />
                </Route>
              </Switch>
            </Router>
          </div>
        )}
      
    </Contexts>
  );
}

export default App;
