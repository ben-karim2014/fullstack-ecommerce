import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import HomePage from './pages/Homepage'
import Account from './pages/Account'



function App() {
  return (
   <Router>
   <Route path="/" exact><HomePage/></Route>
   <Route path="/account" exact><Account/></Route>

   </Router>
  );
}

export default App;
