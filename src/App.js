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
    showClear: PropsTypes.func.isRequired

  }

  async componentDidMount(){
    this.setState({loading: true});
    const res = await Axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users: res.data, loading: false, alertTxt: ''});
  }
  

  searchUsers = async (text)=>{
    if(text === ''){
      this.setState({alertTxt: 'You must enter something at least!'});
    }else{
      this.setState({loading: true});
      const res = await Axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      this.setState({users: res.data.items, loading: false, alertTxt: ''});
      console.log(res.data.items)
    }
    
  }
  clearUsers = ()=> this.setState({users: [], loading: false});
  render(){
    return (
      <div className='App'>
        <NavBar />
        <div className='container'>
          <Alert alertTxt = {this.state.alertTxt}/>
          <Search searchUsers = {this.searchUsers} clearUsers={this.clearUsers} showClear={
            this.state.users.length > 0 ? true: false
          }/>
          <Users loading={this.state.loading} users = {this.state.users}/>
        </div>
      </div>
    )
  }
}



export default App;