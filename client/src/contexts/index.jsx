import React from "react";

import { UserContextProvider } from "./User";
import { RoomContextProvider } from './Room';

const Contexts = ({ children }) => {
  return( 
    <UserContextProvider>
      <RoomContextProvider>
        {children}
      </RoomContextProvider>
    </UserContextProvider>
  );
};

export default Contexts;
