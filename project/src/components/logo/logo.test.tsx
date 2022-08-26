import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import Logo from '../logo/logo';
import React from 'react';
import {AppRoute} from '../../consts';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>);


    const charW = screen.queryAllByText('W');
    expect(charW).toHaveLength(2);

    const charT = screen.queryAllByText('T');
    expect(charT).toHaveLength(1);

    const a = screen.getByRole('link');
    expect(a).toHaveAttribute('href', AppRoute.Main);
  });
});