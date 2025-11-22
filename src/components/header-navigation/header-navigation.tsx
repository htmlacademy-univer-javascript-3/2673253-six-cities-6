import {Link} from 'react-router-dom';
import {logoutAction} from '../../store/api-actions.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../const.ts';

function HeaderNavigation() : JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const hasUser = Boolean(user);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuth && hasUser && (
          <li className="header__nav-item user">
            <a className="header__nav-link header__nav-link--profile" href="#">
              <div className="header__avatar-wrapper user__avatar-wrapper" />
              <span className="header__user-name user__name">
                {user!.email}
              </span>
              <span className="header__favorite-count">
                3
              </span>
            </a>
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
              to={AppRoute.Main}
            >
              <span className="header__signout">Sign out</span>
            </Link>
          )}

          {!isAuth && (
            <Link
              className="header__nav-link"
              to={AppRoute.Login}
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
