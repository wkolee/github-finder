import React, {Component, Fragment} from 'react';



const Search = (props)=>{
    return(
        <Fragment>
            <input type='text' className='form-text' placeholder="Search" aria-label="Search" /><button type='submit' className='btn btn-primary'>submit</button>
        </Fragment>
        
    )
}

export default Search;