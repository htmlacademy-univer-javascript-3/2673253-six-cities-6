import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import PrivateRoute from './private-route.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.ts';

const useAppSelectorMock = vi.fn();

vi.mock('../../hooks', () => ({
  useAppSelector: (selector: unknown) => useAppSelectorMock(selector) as AuthorizationStatus,
}));

describe('Component: PrivateRoute', () => {
  beforeEach(() => {
    useAppSelectorMock.mockReset();
  });

  it('should render children when user is authorized', () => {
    useAppSelectorMock.mockReturnValue(AuthorizationStatus.Auth);

    render(
      <MemoryRouter initialEntries={[AppRoute.Favorites]}>
        <PrivateRoute route={AppRoute.Favorites}>
          <div>Private content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(screen.getByText('Private content')).toBeInTheDocument();
  });

  it('should navigate to login when user is not authorized', () => {
    useAppSelectorMock.mockReturnValue(AuthorizationStatus.NoAuth);

    render(
      <MemoryRouter initialEntries={[AppRoute.Favorites]}>
        <Routes>
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute route={AppRoute.Favorites}>
                <div>Private content</div>
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<div>Login page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });
});
