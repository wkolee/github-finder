import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


const UserItem = ({user: {login, avatar_url}})=>{
        return(
        <div className='card text-center'>
            <img src={avatar_url} alt='avarter' className='round-img' style={{width:'150px'}} />
        <h3>{login}</h3>
        <Link to={`/user/${login}`}>
            <button className='btn btn-primary'>More Info</button>
        </Link>
        </div>
        )
}
UserItem.propsType = {
    user: PropTypes.object.isRequired
}
export default UserItem;