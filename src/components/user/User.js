import React, { Component, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';
import Repos from '../repos/Repos';



export default class User extends Component {
    componentDidMount(){
        this.props.singleUser(this.props.match.params.login);
        this.props.getRepos(this.props.match.params.login);
    }

    render() {
        const {name, avatar_url, html_url,bio, location, followers, following, hireable} = this.props.user;
        const {loading, repos} = this.props;
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
}
