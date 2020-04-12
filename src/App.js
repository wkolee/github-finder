import React, {Component} from 'react';
import NavBar from './components/layout/NavBar';
import Users from './components/user/Users';
import Search from './components/search/Search';
import Alert from './components/alert/Alert';
import PropsTypes from 'prop-types';
import './App.css';
import Axios from 'axios';
//import PropsType from 'prop-types';


class App extends Component{
  
   state = {
    users : [],
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
      console.log(res.data.items)
    }
    
  }
  //after users is fetch, clear the users state
  clearUsers = ()=> {
    this.setState({users: [], loading: false});
    this.clearTxt();
};

  //while the onChange event is being fire clear the alert state
  clearTxt = (emptyString='') => this.setState({alertTxt: emptyString});

  render(){
    const {alertTxt, loading, users } = this.state;
    return (
      <div className='App'>
        <NavBar />
        <div className='container'>
          <Alert alertTxt = {alertTxt}/>
          <Search clearTxt={this.clearTxt} searchUsers = {this.searchUsers} clearUsers={this.clearUsers} showClear={
            users.length > 0 ? true: false
          }
          alertTxt = {alertTxt}
          />
          <Users loading={loading} users = {users}/>
        </div>
      </div>
    )
  }
}



export default App;