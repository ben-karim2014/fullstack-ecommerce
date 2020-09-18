import React from 'react';
import '../App.css';
import TopHeader from '../Components/Header/TopHedaer'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faPhone, faEnvelope} from '@fortawesome/free-solid-svg-icons'

library.add(faPhone, faEnvelope)



function App() {
  return (
    <div className="App" >
    <TopHeader />
      <h1>Hello world</h1>
    </div>
  );
}

export default App;
