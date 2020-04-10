import React, {Component} from 'react';
import NavBar from './components/layout/NavBar';
import Users from './components/user/Users';
import Search from './components/search/Search';
import './App.css';
import Axios from 'axios';
//import PropsType from 'prop-types';


class App extends Component{
   state = {
    users : [],
    loading: false,
  }
/*
  async componentDidMount(){
    this.setState({loading: true});
    const res = await Axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users: res.data, loading: false});
  }
  */

  searchUsers = async (text)=>{
    this.setState({loading: true});
    const res = await Axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users: res.data.items, loading: false});
    console.log(res.data.items)
  }

  render(){
    return (
      <div className='App'>
        <NavBar />
        <div className='container'>
          <Search searchUsers = {this.searchUsers}/>
          <Users loading={this.state.loading} users = {this.state.users}/>
        </div>
      </div>
    )
  }
}



export default App;