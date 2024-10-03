import React from 'react';
import ShareRoom from './components/ShareRoom';
import JoinRoom from './components/JoinRoom';
import Rules from './components/Rules';
import './styles/NewHome.scss'; // Import the SCSS file for styling

function NewHome() {
  return (
    <div className="new-home-container">
      
      <div className="left-section">
        <JoinRoom />
        <ShareRoom />
      </div>
      <div className="right-section">
        <Rules />
      </div>
    </div>
  );
}

export default NewHome;
