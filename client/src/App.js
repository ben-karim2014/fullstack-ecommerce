import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {loadUser} from './actions/authActions'

import HomePage from './pages/Homepage'
//import Register from './pages/Register'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'

import {Provider} from 'react-redux'
import store from './store'
import { CookiesProvider } from "react-cookie";
import Account from './pages/Account'

class App extends React.Component {
  componentDidMount(){
    store.dispatch(loadUser())
  }
  render(){
  return (
    <CookiesProvider>
    <Provider store={store}>
   <Router>
   <Route path="/" exact><HomePage/></Route>
   <Route path="/Account" exact><Account/></Route>
   <Route path="/login" exact><Login/></Route>
   <Route path="/register" exact><Register/></Route>
   <Route path="/profile" exact><Account/></Route>


   </Router>
   </Provider>
   </CookiesProvider>
  );
  }
}

export default App;
