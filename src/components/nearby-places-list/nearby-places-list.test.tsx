import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import NearbyPlacesList from './nearby-places-list.tsx';
import {makeFakeOffer} from '../../mocks/mock-data.ts';
import type {Offer} from '../../types/offer.ts';

const useAppSelectorMock = vi.fn();
const placeCardMock = vi.fn(({offer}: {offer: {title: string}}) => <div>{offer.title}</div>);

vi.mock('../../hooks', () => ({
  useAppSelector: () => useAppSelectorMock() as Offer[],
}));

vi.mock('../place-card/place-card.tsx', () => ({
  __esModule: true,
  default: (props: {offer: {title: string}}) => placeCardMock(props),
}));

describe('Component: NearbyPlacesList', () => {
  const offers = [makeFakeOffer({id: '1', title: 'Nearby 1'})];

  beforeEach(() => {
    vi.clearAllMocks();
    useAppSelectorMock.mockReturnValue(offers);
  });

  it('should render nearby place cards', () => {
    render(<NearbyPlacesList />);

    expect(screen.getByText('Nearby 1')).toBeInTheDocument();
    expect(placeCardMock).toHaveBeenCalledWith(expect.objectContaining({offer: offers[0]}));
  });
});
