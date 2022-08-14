import React from 'react';
import {AppRoute, AuthorizationStatus} from '../../consts';
import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

function PrivateRoute({authorizationStatus, children}: PrivateRouteProps): JSX.Element {

  return (
    authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.SignIn}/>
  );
}

PrivateRoute.defaultProps = {};

export default PrivateRoute;
