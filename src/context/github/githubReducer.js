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



export default (state, action)=>{
    switch(action.type){
        case REMOVE_ALERT:
            return {
                ...state,
                alert: ''
            };
        case SET_ALERT:
            return {
                ...state,
                alert: action.payload
            };
        case GET_REPOS:
            return{
                ...state,
                repos: action.payload,
                loading: false
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        case CLEAR_USER:
            return {
                ...state, 
                users: [],
                user: {}, 
                loading: false
            };
        case SEARCH_USER:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case SET_LOADING:
            return {
                ...state, 
                loading: true
            };
        default:
            return state;
    }

}