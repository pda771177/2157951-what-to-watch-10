type LogoProps = {
  light?: boolean
};

function Logo({light}: LogoProps): JSX.Element {

  const aClassName = light ? 'logo__link logo__link--light' : 'logo__link';

  return (
    <div className="logo">
      <a href="main.html" className={aClassName}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </a>
    </div>
  );
}
Logo.defaultProps = {light: false};

export default Logo;
