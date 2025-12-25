import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Action} from '@reduxjs/toolkit';
import {ThunkDispatch} from 'redux-thunk';
import {vi} from 'vitest';
import App from './app';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const.ts';
import {State} from '../../types/state.ts';
import {makeFakeUserData} from '../../test-helpers/mock-data.ts';
import {makeFakeOffersProcessState, makeFakeState} from '../../test-helpers/mock-state.ts';

vi.mock('../../browser-history.ts', () => {
  const {createMemoryHistory} = require('history');
  return {default: createMemoryHistory()};
});
import browserHistory from '../../browser-history.ts';

vi.mock('../../pages/main-screen/main-screen', () => ({
  default: () => <div>Main page</div>,
}));

vi.mock('../../pages/login-screen/login-screen.tsx', () => ({
  default: () => <div>Login page</div>,
}));

vi.mock('../../pages/favorites-screen/favorites-screen.tsx', () => ({
  default: () => <div>Favorites page</div>,
}));

vi.mock('../../pages/offer-screen/offer-screen.tsx', () => ({
  default: () => <div>Offer page</div>,
}));

vi.mock('../../pages/not-found-screen/not-found-screen.tsx', () => ({
  default: () => <div>Not found page</div>,
}));

type AppThunkDispatch = ThunkDispatch<State, unknown, Action>;

const middlewares = [thunk];
const mockStore = configureMockStore<State, Action<string>, AppThunkDispatch>(middlewares);

const baseState = makeFakeState({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
  [NameSpace.Offers]: makeFakeOffersProcessState({isOfferDataLoading: false}),
});

const renderWithStore = (state: State) => render(
  <Provider store={mockStore(state)}>
    <App />
  </Provider>
);

describe('Application Routing', () => {
  it('should render main page by default route', () => {
    browserHistory.push(AppRoute.Main);
    renderWithStore(baseState);

    expect(screen.getByText('Main page')).toBeInTheDocument();
  });

  it('should render login page on /login', () => {
    browserHistory.push(AppRoute.Login);
    renderWithStore(baseState);

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('should redirect unauthorized user to login when visiting favorites', () => {
    browserHistory.push(AppRoute.Favorites);
    renderWithStore(baseState);

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });

  it('should render favorites page for authorized user', () => {
    browserHistory.push(AppRoute.Favorites);
    renderWithStore({
      ...baseState,
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: makeFakeUserData(),
        userFavoritesCount: 0,
      },
    } as State);

    expect(screen.getByText('Favorites page')).toBeInTheDocument();
  });

  it('should render not found page for unknown route', () => {
    browserHistory.push('/unknown');
    renderWithStore(baseState);

    expect(screen.getByText('Not found page')).toBeInTheDocument();
  });
});
