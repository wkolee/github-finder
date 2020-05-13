import React, { useState,useEffect,Fragment, useContext} from 'react';
import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import User from './components/user/User';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Search from './components/search/Search';
import Alert from './components/alert/Alert';
import PropsTypes from 'prop-types';
import './App.css';
import About from './components/pages/About';
import GithubState from './context/github/GithubState';
import GithubContext from './context/github/githubContext';
//import PropsType from 'prop-types';


const App = ()=>{
    return (
      <GithubState>
      <BrowserRouter>
      <div className='App'>
        <NavBar />
        <div className='container'>
        <Alert />
          <Switch> 
            <Route exact path='/' render={(props)=>(
              <Fragment>
                  <Search/>
                  <Users/>
              </Fragment>
            )} />
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render={(props) =>(
              <Fragment>
                <User {...props}/>
              </Fragment>
            )}/>
          </Switch>
         
        </div>
      </div>
      </BrowserRouter>
      </GithubState>
    )
  }


 App.propsType = {
  users: PropsTypes.object.isRequired,
  loading: PropsTypes.func.isRequired,
  clearUsers: PropsTypes.func.isRequired,
  showClear: PropsTypes.func.isRequired,
  alertTxt: PropsTypes.string.isRequired,
  clearTxt: PropsTypes.func.isRequired
}

export default App;