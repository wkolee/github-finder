import React, {useContext} from 'react';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

 const Repos = () => {
     const githubContext = useContext(GithubContext);
     const {loading, repos} = githubContext;

     if(loading){return <Spinner/>};
    return (
        <div className='card grid-2'>
            <h1>REPOS</h1>
        {repos.map(val => (
            <div key={val.id}>
                <a href={`${val.html_url}`} >
                    {val.name}
                </a> 
            </div>
        ))}
        </div>
    )
}
export default Repos;