import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CityFavorites from './city-favorites.tsx';
import {DEFAULT_SORTING} from '../../const.ts';
import {changeCity, changeSorting} from '../../store/settings-process/settings-process';
import {makeFakeOffer} from '../../mocks/mock-data.ts';
import Cities from '../../mocks/cities.ts';
import {MemoryRouter} from 'react-router-dom';

const dispatchMock = vi.fn();
const useAppDispatchMock = vi.fn(() => dispatchMock);

vi.mock('../../hooks', () => ({
  useAppDispatch: () => useAppDispatchMock(),
}));

vi.mock('../place-card/place-card.tsx', () => ({
  __esModule: true,
  default: ({offer}: {offer: {title: string}}) => <div>{offer.title}</div>,
}));

describe('Component: CityFavorites', () => {
  const city = Cities[0];
  const offer = makeFakeOffer({id: '1', title: 'Favorite place', city});

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render favorite places', () => {
    render(
      <MemoryRouter>
        <CityFavorites city={city.name} places={[offer]} />
      </MemoryRouter>
    );

    expect(screen.getByText('Favorite place')).toBeInTheDocument();
  });

  it('should dispatch city change on link click', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CityFavorites city={city.name} places={[offer]} />
      </MemoryRouter>
    );

    await user.click(screen.getByText(city.name));

    expect(dispatchMock).toHaveBeenCalledWith(changeCity(city));
    expect(dispatchMock).toHaveBeenCalledWith(changeSorting(DEFAULT_SORTING));
  });
});
