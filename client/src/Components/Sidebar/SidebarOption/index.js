import React from 'react';
import './index.css';

const SidebarOption = ({ title, Icon }) => {
  return (
    <div className='sidebarOption'>
      <Icon className='sidebarOption_icon' />
      <p>{title}</p>
    </div>
  );
};

export default SidebarOption;
