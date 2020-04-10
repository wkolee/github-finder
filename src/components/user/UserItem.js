import React from 'react';
import PropTypes from 'prop-types';


const UserItem = ( {user: {login, avatar_url, html_url}} )=>{
        return(
        <div className='card text-center'>
            <img src={avatar_url} alt='avarter' className='round-img' style={{width:'60px'}} />
        <h3>{login}</h3>
        <button className='btn btn-primary'>{html_url}</button>
        </div>
        )
}
UserItem.propsType = {
    user: PropTypes.object.isRequired
}
export default UserItem;