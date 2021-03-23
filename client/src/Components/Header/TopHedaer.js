import React from 'react';
import TopMenue from './TopMenue'
import RightMenue from './LeftTopMenue'
import ShoppingHeader from './ShoppingHeader'

const TopHeader = (props) => {
  
  return (
        <div>
        <TopMenue />
        <RightMenue />
        {<ShoppingHeader />}
        <hr></hr>
          </div>
        
    
  );
}

export default TopHeader;