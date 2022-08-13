import {UserData} from '../types/user-data';

const AUTH_USER_KEY_NAME = 'what-to-watch-user';

export type Token = string;

export const getUserToken = (): Token => getUser()?.token ?? '';

export const saveUser = (user: UserData): void => {
  localStorage.setItem(AUTH_USER_KEY_NAME, JSON.stringify(user));
};

export const getUser = (): UserData => {
  try {
    return JSON.parse(localStorage.getItem(AUTH_USER_KEY_NAME) as string);
  }catch (e) {
    return {token: ''} as UserData;
  }
};

export function dropUser() {
  localStorage.removeItem(AUTH_USER_KEY_NAME);
}
