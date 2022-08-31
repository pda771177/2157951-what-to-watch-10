import React from 'react';
import {AppRoute} from '../../consts';

type LogoProps = {
  light?: boolean,
  letters: string[]
};

function Logo({light, letters}: LogoProps): JSX.Element {

  const aClassName = light ? 'logo__link logo__link--light' : 'logo__link';

  return (
    <div className="logo">
      <a href={AppRoute.Main} className={aClassName}>
        <span className="logo__letter logo__letter--1">{letters[0]}</span>
        <span className="logo__letter logo__letter--2">{letters[1]}</span>
        <span className="logo__letter logo__letter--3">{letters[2]}</span>
      </a>
    </div>
  );
}
Logo.defaultProps = {light: false, letters: ['W','T','W']};

export default Logo;
