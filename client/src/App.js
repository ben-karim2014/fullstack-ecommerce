import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {loadUser} from './actions/authActions'

import HomePage from './pages/Homepage'
import Register from './pages/Register'
import Login from './pages/Login'
import {Provider} from 'react-redux'
import store from './store'
import { CookiesProvider } from "react-cookie";

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
   <Route path="/register" exact><Register/></Route>
   <Route path="/login" exact><Login/></Route>

   </Router>
   </Provider>
   </CookiesProvider>
  );
  }
}

export default App;
