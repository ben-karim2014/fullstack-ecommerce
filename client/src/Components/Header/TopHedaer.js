import React from 'react';
import TopMenue from './TopMenue'
import RightMenue from './LeftTopMenue'

const TopHeader = (props) => {
  
  return (
        <div>
        <TopMenue />
        <RightMenue />
        <hr></hr>
          </div>
        
    
  );
}

export default TopHeader;