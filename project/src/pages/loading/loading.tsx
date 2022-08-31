import Logo from '../../components/logo/logo';
import Copyright from '../../components/copyright/copyright';
import React from 'react';
import './loading.css';

function Loading(): JSX.Element {
  return (
    <div className="page-content">
      <div className='loading-img-wrapper'>
        <img className='loading-img' alt='Loading...' src='https://c.tenor.com/bZEUn3ywcQQAAAAd/stormcastle-count-down.gif'/>
      </div>

      <footer className="page-footer">
        <Logo light/>
        <Copyright/>
      </footer>
    </div>
  );
}

export default Loading;

