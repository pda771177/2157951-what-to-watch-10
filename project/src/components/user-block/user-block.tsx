import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../consts';
import {useNavigate} from 'react-router-dom';
import {logoutAction} from '../../store/api-actions';
import {getUser} from '../../services/localStorageUser';

function UserBlock(): JSX.Element {
  const {authorizationStatus} = useAppSelector((state) => state);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onLogoutClick = () => {
    dispatch(logoutAction());
  };

  const userBlockContent = authorizationStatus === AuthorizationStatus.Auth ? (
    <React.Fragment>
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={getUser().avatarUrl} alt="User avatar" width="63" height="63"/>
        </div>
      </li>
      <li className="user-block__item">
        <a onClick={onLogoutClick} className="user-block__link">Sign out</a>
      </li>
    </React.Fragment>
  ) : (
    <a onClick={() => {navigate(AppRoute.SignIn);}} className="user-block__link">Sign in</a>
  );
  return (
    <ul className="user-block">
      {userBlockContent}
    </ul>
  );
}

export default UserBlock;
