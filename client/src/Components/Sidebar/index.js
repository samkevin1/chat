import React from 'react';
import firebase from 'firebase';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import SidebarOption from './SidebarOption';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import './index.css';

const Sidebar = () => {
  const user = firebase.auth().currentUser;
  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
        <img src={user.photoURL} alt='' />
        <p>{user.displayName} <KeyboardArrowDownRoundedIcon /></p>
      </div>
      <div className='sidebar_icons'>
        <SidebarOption Icon={DashboardIcon} title='Home' />
        <SidebarOption Icon={ChatRoundedIcon} title='Chat' />
        <SidebarOption Icon={PersonRoundedIcon} title='Contact' />
        <SidebarOption Icon={NotificationsIcon} title='Notifications' />
        <SidebarOption Icon={CalendarTodayIcon} title='Calendar' />
        <SidebarOption Icon={SettingsIcon} title='Settings' />
        <SidebarOption Icon={PowerSettingsNewIcon} title='Logout' />
      </div>
    </div>
  );
};

export default Sidebar;
