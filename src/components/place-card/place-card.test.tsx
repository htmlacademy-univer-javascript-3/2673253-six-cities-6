import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlaceCard from './place-card.tsx';
import {AuthorizationStatus, FavoriteStatus} from '../../const.ts';
import {makeFakeOffer} from '../../mocks/mock-data.ts';
import {MemoryRouter} from 'react-router-dom';

const dispatchMock = vi.fn();
const useAppDispatchMock = vi.fn(() => dispatchMock);
const useAppSelectorMock = vi.fn();
const changeFavoritesStatusActionMock = vi.fn((payload: {offerId: string; status: FavoriteStatus}) => ({
  type: 'changeFavoritesStatusAction',
  payload,
}));
const redirectToRouteMock = vi.fn((route: string) => ({type: 'redirectToRoute', payload: route}));

vi.mock('../../hooks', () => ({
  useAppDispatch: () => useAppDispatchMock(),
  useAppSelector: () => useAppSelectorMock() as AuthorizationStatus,
}));

vi.mock('../../store/api-actions/api-actions.ts', () => ({
  changeFavoritesStatusAction: (payload: {offerId: string; status: FavoriteStatus}) =>
    changeFavoritesStatusActionMock(payload),
}));

vi.mock('../../store/actions.ts', () => ({
  redirectToRoute: (route: string) => redirectToRouteMock(route),
}));

describe('Component: PlaceCard', () => {
  const baseOffer = makeFakeOffer();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call onHover on mouse enter and leave', () => {
    useAppSelectorMock.mockReturnValue(AuthorizationStatus.Auth);
    const onHover = vi.fn();

    render(
      <MemoryRouter>
        <PlaceCard offer={baseOffer} onHover={onHover} className="cities" />
      </MemoryRouter>
    );

    const card = screen.getByRole('article');
    fireEvent.mouseEnter(card);
    fireEvent.mouseLeave(card);

    expect(onHover).toHaveBeenCalledWith(baseOffer.id);
    expect(onHover).toHaveBeenCalledWith(null);
  });

  it('should dispatch redirect when user not authorized', async () => {
    useAppSelectorMock.mockReturnValue(AuthorizationStatus.NoAuth);
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <PlaceCard offer={{...baseOffer, isFavorite: false}} className="cities" />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button'));

    expect(redirectToRouteMock).toHaveBeenCalledWith('/login');
    expect(dispatchMock).toHaveBeenCalledWith({type: 'redirectToRoute', payload: '/login'});
  });

  it('should dispatch changeFavoritesStatusAction when user is authorized', async () => {
    useAppSelectorMock.mockReturnValue(AuthorizationStatus.Auth);
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <PlaceCard offer={{...baseOffer, isFavorite: false}} className="cities" />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button'));

    expect(changeFavoritesStatusActionMock).toHaveBeenCalledWith({
      offerId: baseOffer.id,
      status: FavoriteStatus.In,
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'changeFavoritesStatusAction',
      payload: {offerId: baseOffer.id, status: FavoriteStatus.In},
    });
  });

  it('should toggle favorite status off when already favorite', async () => {
    useAppSelectorMock.mockReturnValue(AuthorizationStatus.Auth);
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <PlaceCard offer={{...baseOffer, isFavorite: true}} className="cities" />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button'));

    expect(changeFavoritesStatusActionMock).toHaveBeenCalledWith({
      offerId: baseOffer.id,
      status: FavoriteStatus.Out,
    });
  });
});
