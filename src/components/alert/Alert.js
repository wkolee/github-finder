import React, {useContext} from 'react';
import GithubContext from '../../context/github/githubContext';

const Alert = ()=>{
    const githubContext = useContext(GithubContext);
 
    return(
            <h3 style={{textAlign: 'center', color: 'red'}}>
                {githubContext.alert}
            </h3>
        )
}
export default Alert;