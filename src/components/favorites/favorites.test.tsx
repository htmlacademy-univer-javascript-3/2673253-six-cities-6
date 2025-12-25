import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Favorites from './favorites.tsx';
import type {Offer} from '../../types/offer.ts';

const useAppSelectorMock = vi.fn();

vi.mock('../../hooks', () => ({
  useAppSelector: () => useAppSelectorMock() as Record<string, Offer[]>,
}));

vi.mock('../city-favorites/city-favorites.tsx', () => ({
  __esModule: true,
  default: ({city}: {city: string}) => <div>City favorites: {city}</div>,
}));

describe('Component: Favorites', () => {
  beforeEach(() => {
    useAppSelectorMock.mockReset();
  });

  it('should render empty state when there are no favorites', () => {
    useAppSelectorMock.mockReturnValue({});

    render(<Favorites />);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });

  it('should render list of favorite cities', () => {
    useAppSelectorMock.mockReturnValue({Paris: []});

    render(<Favorites />);

    expect(screen.getByText('City favorites: Paris')).toBeInTheDocument();
  });
});
