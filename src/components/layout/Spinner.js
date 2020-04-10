import React, {Fragment } from 'react';
import Spinner from './spinner.gif';


const Spin = (props)=>{
    return(
        <Fragment>
            <img src={Spinner} alt='loading...' style={{width: '200px', margin: 'auto', display: 'block'}}/>
        </Fragment>
    )
}

export default Spin;
