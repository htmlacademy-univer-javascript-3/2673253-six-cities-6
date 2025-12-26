import LoginHeader from '../../components/header/login-header.tsx';
import {FormEvent, useMemo, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {loginAction} from '../../store/api-actions/api-actions.ts';
import {Link, Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, DEFAULT_SORTING, PASSWORD_REQUIREMENTS_TEXT} from '../../const.ts';
import {getAuthorizationStatus} from '../../store/user-process/selectors.ts';
import Cities from '../../mocks/cities.ts';
import {changeCity, changeSorting} from '../../store/settings-process/settings-process.ts';
import isPasswordValid from '../../utils/is-password-valid.ts';

function LoginScreen(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const randomCity = useMemo(() => Cities[Math.floor(Math.random() * Cities.length)], []);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} replace/>;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const password = passwordRef.current.value;
      const passwordIsValid = isPasswordValid(password);

      if (!passwordIsValid) {
        passwordRef.current.setCustomValidity(PASSWORD_REQUIREMENTS_TEXT);
        passwordRef.current.reportValidity();
        return;
      }

      passwordRef.current.setCustomValidity('');
      dispatch(loginAction({
        login: loginRef.current.value,
        password,
        redirectTo: AppRoute.Main,
      }));
    }
  };

  const handleCityClick = () => {
    dispatch(changeCity(randomCity));
    dispatch(changeSorting(DEFAULT_SORTING));
  };

  return (
    <div className="page page--gray page--login">
      <LoginHeader/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                  onInput={() => passwordRef.current?.setCustomValidity('')}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main} onClick={handleCityClick}>
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
