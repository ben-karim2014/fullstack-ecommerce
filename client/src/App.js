import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {loadUser} from './actions/authActions'

import HomePage from './pages/Homepage'
import Account from './pages/Account'

import {Provider} from 'react-redux'
import store from './store'

class App extends React.Component {
  componentDidMount(){
    store.dispatch(loadUser())
  }
  render(){
  return (
    <Provider store={store}>
   <Router>
   <Route path="/" exact><HomePage/></Route>
   <Route path="/account" exact><Account/></Route>

   </Router>
   </Provider>
  );
  }
}

export default App;
