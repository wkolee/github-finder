import React, {Fragment, Component} from 'react';
import PropsType from 'prop-types';

class Search extends Component{
    state = {
        text: ''
    }

    static propsTypes = {
        searchUsers: PropsType.func.isRequired,
        clearUsers: PropsType.func.isRequired
    }

   onChange = (e)=> this.setState({[e.target.name]: e.target.value});
   onSubmit = (e)=>{ 
    e.preventDefault();
    this.props.searchUsers(this.state.text);
    this.setState({text: ''});

    }

    render(){
        const {showClear,clearUsers, alert } = this.props;
        return(

            <Fragment>
                <h1>{alert}</h1>
                <form onSubmit={this.onSubmit} className='form'>
                    <input 
                    type='text' 
                    name='text' 
                    placeholder="Search users" 
                    value={this.state.text}
                    onChange = {this.onChange}
                    />
                    <input type='submit' value='Search' className='btn btn-primary btn-block'/>
                </form>
                {showClear && <button className='btn btn-link btn-block' onClick = {clearUsers}>Clear</button>}
                
            </Fragment>
            
        )
    }
}


export default Search;