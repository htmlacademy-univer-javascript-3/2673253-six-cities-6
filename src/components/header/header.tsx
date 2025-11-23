import {AppRoute} from '../../const.ts';
import {Link} from 'react-router-dom';
import HeaderNavigation from '../header-navigation/header-navigation.tsx';

type headerProps = {
  isMain: boolean;
}

function Header({isMain}: headerProps) : JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={`header__logo-link ${isMain && 'header__logo-link--active'}`} to={AppRoute.Main}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <HeaderNavigation />
        </div>
      </div>
    </header>
  );
}

export default Header;
