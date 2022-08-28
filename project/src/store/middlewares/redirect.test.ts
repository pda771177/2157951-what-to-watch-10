import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from 'redux';
import {redirect} from './redirect';
import {redirectToRoute} from '../action';

import {State} from '../../types/state';
import {AppRoute} from "../../consts";

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /404', () => {
    store.dispatch(redirectToRoute(AppRoute.Unknown));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Unknown);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Unknown),
    ]);
  });
});