import React from 'react';

type SpinnerProps = {};

function Spinner({}: SpinnerProps): JSX.Element {

  return (
    <p>Loading ...</p>
  );
}

Spinner.defaultProps = {};

export default Spinner;