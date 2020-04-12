import React from 'react';


const Alert = ({alertTxt})=>{
    return(
            <h3 style={{textAlign: 'center', color: 'red'}}>
                {alertTxt}
            </h3>
        )
}
export default Alert;