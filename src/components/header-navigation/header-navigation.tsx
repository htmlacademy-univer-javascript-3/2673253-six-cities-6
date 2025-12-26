import {Link, useLocation} from 'react-router-dom';
import {logoutAction} from '../../store/api-actions/api-actions.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {getAuthorizationStatus, getFavoritesCount, getUser} from '../../store/user-process/selectors.ts';

function HeaderNavigation() : JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const favoritesCount = useAppSelector(getFavoritesCount);

  const dispatch = useAppDispatch();

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const hasUser = Boolean(user);
  const location = useLocation();

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuth && hasUser && (
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
              <div className="header__avatar-wrapper user__avatar-wrapper" />
              <span className="header__user-name user__name">
                {user!.email}
              </span>
              <span className="header__favorite-count">
                {favoritesCount ?? 0}
              </span>
            </Link>
          </li>
        )}
        <li className="header__nav-item">
          {isAuth && hasUser && (
            <Link
              className="header__nav-link"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
              to={location.pathname as AppRoute}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          )}

          {!isAuth && (
            <Link
              className="header__nav-link"
              to={AppRoute.Login}
              state={{ from: location.pathname as AppRoute }}
            >
              <span className="header__login">Login</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNavigation;
