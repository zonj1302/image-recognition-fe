import React from "react";

function Navigation({ onRouteChange, isSignedIn }) {
    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        {isSignedIn ?
            <p onClick={ () => onRouteChange('signout') } className='f3 link dim black underline pa3 pointer'>Sign Out</p>
        :
        <>
            <p onClick={ () => onRouteChange('signin') } className='f3 link dim black underline pa3 pointer'>Sign In</p>
            <p onClick={ () => onRouteChange('register') } className='f3 link dim black underline pa3 pointer'>Register</p>
        </>
        }
        </nav> 
    )
}

export default Navigation;