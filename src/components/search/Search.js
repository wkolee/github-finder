import React, {Fragment, useState, useContext} from 'react';
import PropsType from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Search = ({showClear,clearUsers, clearTxt})=>{
    const githubContext = useContext(GithubContext);

    const [text, setText] = useState(null);
     

    
   const onChange = (e)=> {
        githubContext.clearTxt();
        setText(e.target.value)    
    };
   const onSubmit = (e)=>{ 
        e.preventDefault();
        githubContext.searchUsers(text);
        setText(e.target.value)

    }

    
        return(
            <Fragment>
                <form onSubmit={onSubmit} className='form'>
                    <input 
                    type='text' 
                    name='text' 
                    placeholder="Search users" 
                    value={text || " "}
                    onChange = {onChange}
                    />
                    <input type='submit' value='Search' className='btn btn-primary btn-block'/>
                </form>
                <button className='btn btn-link btn-block' onClick = {githubContext.clearUsers} style={{color:'white'}}>Clear</button>
                
            </Fragment>
            
        )
    
}

 Search.propsTypes = {
    clearUsers: PropsType.func.isRequired,
    text: PropsType.string.isRequired
}
export default Search;