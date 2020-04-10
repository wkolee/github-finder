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

  async componentDidMount(){
    this.setState({loading: true});
    const res = await Axios.get(`https://api.github.com/users`);
    console.log(res.data);
    this.setState({users: res.data, loading: false});

  }

  render(){
    return (
      <div className='App'>
        <NavBar />
        <div className='container'>
          <Search />
          <Users loading={this.state.loading} users = {this.state.users}/>
        </div>
      </div>
    )
  }
}



export default App;