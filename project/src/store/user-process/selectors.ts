import {AuthorizationStatus, NameSpace} from '../../consts';
import {State} from '../../types/state';

export const authorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const checkUserAuthorization = (state: State): boolean => authorizationStatus(state) === AuthorizationStatus.Auth;
