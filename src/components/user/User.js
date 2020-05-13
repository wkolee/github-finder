import React, { useEffect, Fragment, useContext } from 'react';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/githubContext';



const  User =(props)=>{
const githubContext = useContext(GithubContext);
const {singleUser, getRepos, repos, user, clearTxt, loading} = githubContext;
console.log('fdgfgffggfgng',user)
    useEffect(()=>{
       singleUser(props.match.params.login);
       getRepos(props.match.params.login);
       clearTxt();
    //eslint-disable-next-line
    },[])
        
    

    
        const {name, avatar_url, html_url,bio, location, followers, following, hireable} = user;
        
        if(loading) return <Spinner />;
        return (
            <Fragment>
                <Link to ='/'>
                    <button className='btn btn-warning'>Back to Search</button>
                </Link>
                Hireable:{
                hireable ? <i className='fas fa-check text-success' /> :
                <i className='fas fa-times-circle text-danger'/>
                }
                <div className='card grid-2'>
                    <div className='all-center'>
                        <img src={avatar_url} className='round-img' style={{width: '150px'}} alt='pic'/>
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                    </div>
                    <div>
                    {bio && 
                        <Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                        </Fragment>
                    }
                    <a href={html_url}>Github Profile</a>
                    </div>
                    <button className='btn btn-primary'>Followers: {followers}</button>
                    <button className='btn btn-primary'>Following: {following}</button>
                </div>
                <Repos repos = {repos} loading={loading}/> 
            </Fragment> 
        )
    
}

export default User;