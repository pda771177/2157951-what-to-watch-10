import Logo from '../../components/logo/logo';
import Copyright from '../../components/copyright/copyright';
import React, {FormEvent, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {TAuthData} from '../../types/auth-data';
import {loadFavoritesAction, loginAction} from '../../store/api-actions';
import {AppRoute, RegExps} from '../../consts';
import {checkUserAuthorization} from '../../store/user-process/selectors';
import {redirectToRoute} from '../../store/action';

function SignIn(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isLoginCorrect, setIsLoginCorrect] = useState(false);
  const [isPassCorrect, setIsPassCorrect] = useState(false);
  const [autorizationFail, setAutorizationFail] = useState(false);

  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector(checkUserAuthorization);

  if (isAuthorized) {
    dispatch(redirectToRoute(AppRoute.Main));
  }

  const onChangeLogin = function (event: React.ChangeEvent<HTMLInputElement>) {
    const login = event.target.value;
    RegExps.login.test(login) ? setIsLoginCorrect(true) : setIsLoginCorrect(false);
  };

  const onChangePass = function (event: React.ChangeEvent<HTMLInputElement>) {
    const pass = event.target.value;
    RegExps.password.test(pass) ? setIsPassCorrect(true) : setIsPassCorrect(false);
  };

  const onSubmit = (authData: TAuthData) => {
    if (!isPassCorrect || !isLoginCorrect) {
      return;
    }
    dispatch(loginAction(authData));
    if (isAuthorized) {
      dispatch(loadFavoritesAction());
      dispatch(redirectToRoute(AppRoute.Main));
    }else {
      setAutorizationFail(true);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            {autorizationFail && (
              <div className="sign-in__message">
                <p>Autorization error, please check your login and password, and try again</p>
              </div>
            )}
            <div className={isLoginCorrect ? 'sign-in__field' : 'sign-in__field sign-in__field--error'}>
              <input onChange={onChangeLogin} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" ref={loginRef}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className={isPassCorrect ? 'sign-in__field' : 'sign-in__field sign-in__field--error'}>
              <input onChange={onChangePass} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" ref={passwordRef}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <Logo light/>
        <Copyright/>
      </footer>
    </div>
  );
}

export default SignIn;
