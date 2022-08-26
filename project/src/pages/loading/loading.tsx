import Logo from '../../components/logo/logo';
import Copyright from '../../components/copyright/copyright';
import React from 'react';

function LoadingScreen(): JSX.Element {
  return (
    <div className="page-content">
      <div style={{marginTop: '25%', marginBottom: '25%'}}>
        <img alt='Loading...' style={{display: 'block', margin: '0 auto'}} src='https://c.tenor.com/bZEUn3ywcQQAAAAd/stormcastle-count-down.gif'/>
      </div>

      <footer className="page-footer">
        <Logo light/>
        <Copyright/>
      </footer>
    </div>
  );
}

export default LoadingScreen;

