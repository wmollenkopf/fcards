import React from 'react';

const Navigation = ({ isSignedIn, performSignOut }) => {
    if (isSignedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <button className={`btn btn-sm btn-default`} onClick={performSignOut}><i className={`glyphicon glyphicon-log-out`}></i> Log Out</button>
        </nav>
      );
    } else {
      return <div>&nbsp;<br/></div>
    }
    //  else {
    //   return (
    //     <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
    //       <p onClick={() => onRouteChange('signin')} >Register/Login</p>
    //     </nav>
    //   );
    // }
}

export default Navigation;