import React from 'react';

const Navigation = ({ isSignedIn, performSignOut }) => {
  const logOutBtn = (
    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <button className={`btn btn-sm btn-default`} onClick={performSignOut}><i className={`glyphicon glyphicon-log-out`}></i> Log Out</button>
    </nav>
  );

  if (isSignedIn) {
    return logOutBtn;  
  } else {
    return (<div>&nbsp;<br/></div>)
  }

}

export default Navigation;