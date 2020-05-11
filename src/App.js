import React, {Component, Fragment} from 'react';
import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import User from './components/user/User';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Search from './components/search/Search';
import Alert from './components/alert/Alert';
import PropsTypes from 'prop-types';
import './App.css';
import Axios from 'axios';
import About from './components/pages/About';
//import PropsType from 'prop-types';


class App extends Component{
  
   state = {
    users : [],
    user: {},
    repos: [],
    loading: false,
    alertTxt: ''
  }
  static propsType = {
    users: PropsTypes.object.isRequired,
    loading: PropsTypes.func.isRequired,
    searchUsers: PropsTypes.func.isRequired,
    clearUsers: PropsTypes.func.isRequired,
    showClear: PropsTypes.func.isRequired,
    alertTxt: PropsTypes.string.isRequired,
    clearTxt: PropsTypes.func.isRequired
  }

  //get the first list of github users
  async componentDidMount(){
    this.setState({loading: true});
    const res = await Axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users: res.data, loading: false, alertTxt: ''});
  }
  
//search users by name
  searchUsers = async (text)=>{
    if(text === ''){
      //if input field is empty set alert state
      this.setState({alertTxt: 'You must enter something at least!'});
    }else{
      //fetch the users if there's a input value 
      this.setState({loading: true});
      const res = await Axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      this.setState({users: res.data.items, loading: false, alertTxt: ''});
    }
    
  }
  //after users is fetch, clear the users state
  clearUsers = ()=> {
    this.setState({users: [], loading: false});
    this.clearTxt();
};

  //while the onChange event is being fire clear the alert state
  clearTxt = (emptyString='') => this.setState({alertTxt: emptyString});

//get single user

singleUser = async (user)=>{
    this.setState({loading: true});
    const res = await Axios.get(`https://api.github.com/users/${user}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({user: res.data, loading: false});
    
}
getRepos = async (user)=>{
  this.setState({loading: true});
  const res = await Axios.get(`https://api.github.com/users/${user}/repos?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  this.setState({repos: res.data, loading: false});
  console.log(this.state.repos)
}

  render(){
    const {alertTxt, loading, users, user, repos} = this.state;
    return (
      <BrowserRouter>
      <div className='App'>
        <NavBar />
        <div className='container'>
          <Alert alertTxt = {alertTxt}/>
          <Switch> 
            <Route exact path='/' render={(props)=>(
              <Fragment>
                   <Search clearTxt={this.clearTxt} searchUsers = {this.searchUsers} clearUsers={this.clearUsers} showClear={
                    users.length > 0 ? true: false
                  }
                  alertTxt = {alertTxt}
                  />
                  <Users loading={loading} users = {users}/>
              </Fragment>
            )} />
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render={(props) =>(
              <Fragment>
                <User {...props} singleUser={this.singleUser} repos = {repos} getRepos={this.getRepos} user={user} loading = {loading}/>
              </Fragment>
            )}/>
          </Switch>
         
        </div>
      </div>
      </BrowserRouter>
    )
  }
}



export default App;