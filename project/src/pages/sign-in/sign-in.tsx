import Logo from '../../components/logo/logo';
import Copyright from '../../components/copyright/copyright';
import {FormEvent, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {TAuthData} from '../../types/auth-data';
import {loadFavoritesAction, loginAction} from '../../store/api-actions';
import {AppRoute, MINIMAL_PASSWORD_LENGTH} from '../../consts';
import {useNavigate} from 'react-router-dom';
import {checkUserAuthorization} from '../../store/user-process/selectors';

function SignIn(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthorized = useAppSelector(checkUserAuthorization);

  if (isAuthorized) {
    navigate(AppRoute.Main);
  }

  const onSubmit = (authData: TAuthData) => {
    if (authData.password.length < MINIMAL_PASSWORD_LENGTH) {
      //alert("Password too weak. Minimal length is " + MINIMAL_PASSWORD_LENGTH.toString());
      return;
    }
    dispatch(loginAction(authData));
    if (isAuthorized){
      dispatch(loadFavoritesAction());
      navigate(AppRoute.Main);
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
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" ref={loginRef}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" ref={passwordRef}/>
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
