import {render, screen} from '@testing-library/react';
import React from 'react';
import Copyright from './copyright';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(<Copyright/>)

    const text = screen.queryAllByText('© 2019 What to watch Ltd.');
    expect(text).toHaveLength(1);
  });
});