import React from 'react';
import {useAppSelector} from '../../hooks';
import {checkUserAuthorization} from '../../store/user-process/selectors';
import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../consts';

type SignInRouteProps = {
  children: JSX.Element;
};

function SignInRoute({children}: SignInRouteProps): JSX.Element {

  const isAutorized = useAppSelector(checkUserAuthorization);

  return (
    !isAutorized ? children : <Navigate to={AppRoute.Main}/>
  );
}
SignInRoute.defaultProps = {};

export default SignInRoute;
