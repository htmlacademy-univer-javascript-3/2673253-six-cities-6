import { Link } from 'react-router-dom';
import {AppRoute} from '../../const.ts';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="container">
          <h1>Page not found</h1>
          <Link to={AppRoute.Main}>
            <button className="form__submit button">Main</button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NotFoundScreen;
