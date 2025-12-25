import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import PlaceList from './place-list.tsx';
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

describe('Component: PlaceList', () => {
  const offers = [makeFakeOffer({id: '1', title: 'Offer 1'}), makeFakeOffer({id: '2', title: 'Offer 2'})];

  beforeEach(() => {
    vi.clearAllMocks();
    useAppSelectorMock.mockReturnValue(offers);
  });

  it('should render offers from selector', () => {
    render(<PlaceList onListItemHover={vi.fn()} />);

    expect(screen.getByText('Offer 1')).toBeInTheDocument();
    expect(screen.getByText('Offer 2')).toBeInTheDocument();
    expect(placeCardMock).toHaveBeenCalledTimes(2);
  });
});
