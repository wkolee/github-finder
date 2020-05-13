import React, { useReducer, useEffect } from 'react';
import githubContext from './githubContext';
import githubReducer from './githubReducer';
import Axios from 'axios';


//ACTIONS
import {
    SEARCH_USER,
    GET_REPOS,
    GET_USER,
    REMOVE_ALERT,
    SET_ALERT,
    SET_LOADING,
    CLEAR_USER
} from '../types';

// SET STATES
const GithubState = (props) => {
    //global state 
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        alert:''
    }
    const [state, dispatch] = useReducer(githubReducer, initialState);



    
    //get all users
    useEffect(()=>{
        setLoading();
        const res = fetch(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
        .then(data => data.json())
        .then(data =>  {
            console.log('USERSSS',data)
            setLoading();
            dispatch({type: SEARCH_USER, payload: data});
            //
            //setAlert();
        });
      }, [])

    //search users by name
  const searchUsers = async (fieldValue)=>{
    if(fieldValue === undefined || fieldValue === null){
      setAlert();
    }else{
      //fetch the users if there's a input value 
      setLoading();
      const res = await Axios.get(`https://api.github.com/search/users?q=${fieldValue}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      dispatch({type: SEARCH_USER, payload: res.data.items});
    } 
  }

 
   //after users is fetch, clear the users state
   const clearUsers = ()=> {
    dispatch({type: CLEAR_USER});
    clearTxt();
    };

   
    //get single user
    const singleUser = async (user)=>{
    setLoading();
    const res = await Axios.get(`https://api.github.com/users/${user}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setLoading();  
    dispatch({type: GET_USER, payload: res.data});
  }


  const getRepos = async (user)=>{
    setLoading();
    const res = await Axios.get(`https://api.github.com/users/${user}/repos?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setLoading();
    dispatch({type: GET_REPOS, payload: res.data});
  }

    const setLoading = () => dispatch({type: SET_LOADING});
    //while the onChange event is being fire clear the alert state
    const clearTxt = () => (dispatch({type: REMOVE_ALERT}));
    const setAlert = () => (dispatch({type: SET_ALERT, payload: 'You must enter something at least!'}));




    return <githubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                alert: state.alert,
                clearUsers,
                searchUsers, 
                setLoading,
                singleUser,
                clearTxt,
                getRepos,
            }}>
                {props.children}
            </githubContext.Provider>
}
export default GithubState;