import React from 'react';
import {AppRoute} from '../../consts';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {checkUserAuthorization} from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const isAutorized = useAppSelector(checkUserAuthorization);

  return (
    isAutorized ? children : <Navigate to={AppRoute.SignIn}/>
  );
}

PrivateRoute.defaultProps = {};

export default PrivateRoute;
