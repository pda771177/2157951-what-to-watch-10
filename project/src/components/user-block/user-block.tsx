import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../consts';
import {useNavigate} from 'react-router-dom';
import {logoutAction} from '../../store/api-actions';
import {getUser} from '../../services/localStorageUser';

function UserBlock(): JSX.Element {
  const {authorizationStatus} = useAppSelector((state) => state.USER);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onLogoutClick = () => {
    navigate(AppRoute.Main);
    dispatch(logoutAction());
  };

  const onSignInClick = () => {
    navigate(AppRoute.SignIn);
  };

  let avatarUrl: string | null;
  try {
    avatarUrl = getUser().avatarUrl;
  }catch (e) {
    avatarUrl = null;
  }

  return (
    <ul className="user-block">
      {authorizationStatus !== AuthorizationStatus.Auth || !avatarUrl ? (
        <a onClick={onSignInClick} className="user-block__link">Sign in</a>
      ) : (
        <React.Fragment>
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src={avatarUrl} alt="User avatar" width="63" height="63"/>
            </div>
          </li>
          <li className="user-block__item">
            <a onClick={onLogoutClick} className="user-block__link">Sign out</a>
          </li>
        </React.Fragment>
      )}
    </ul>
  );
}

export default UserBlock;
