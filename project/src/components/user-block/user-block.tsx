import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AppRoute} from '../../consts';
import {useNavigate} from 'react-router-dom';
import {logoutAction} from '../../store/api-actions';
import {getUser} from '../../services/localStorageUser';
import {checkUserAuthorization} from '../../store/user-process/selectors';

function UserBlock(): JSX.Element {
  const isAuthorized = useAppSelector(checkUserAuthorization);
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
  } catch (e) {
    avatarUrl = null;
  }

  if (isAuthorized && avatarUrl) {
    return (
      <ul className="user-block">
        {
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
        }
      </ul>
    );
  }
  return (
    <ul className="user-block">
      {<a onClick={onSignInClick} className="user-block__link">Sign in</a>}
    </ul>
  );
}

export default UserBlock;
