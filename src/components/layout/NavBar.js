import React from "react";
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";


const NavBar = ({icon, title}) => {
        return (
            <nav className='navbar bg-primary'>
                <Link to='/'>
                    <h1>
                    <i className={icon}/>
                    {title}
                    </h1>
                </Link>
                <Link to='/about'>About</Link>
            </nav>
        )
    
}
NavBar.defaultProps = {
    title:'Github Finder',
    icon: 'fab fa-github'
};
NavBar.propTypes ={
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default NavBar