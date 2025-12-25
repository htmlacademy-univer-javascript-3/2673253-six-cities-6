import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CityList from './city-list.tsx';
import {DEFAULT_CITY, DEFAULT_SORTING} from '../../const.ts';
import {makeFakeCity} from '../../mocks/mock-data.ts';
import {changeCity, changeSorting} from '../../store/settings-process/settings-process';
import type {City} from '../../types/city.ts';

const dispatchMock = vi.fn();
const useAppDispatchMock = vi.fn(() => dispatchMock);
const useAppSelectorMock = vi.fn();

vi.mock('../../hooks', () => ({
  useAppDispatch: () => useAppDispatchMock(),
  useAppSelector: () => useAppSelectorMock() as City,
}));

describe('Component: CityList', () => {
  const anotherCity = makeFakeCity('Amsterdam');

  beforeEach(() => {
    vi.clearAllMocks();
    useAppSelectorMock.mockReturnValue(DEFAULT_CITY);
  });

  it('should not dispatch when clicking already selected city', async () => {
    const user = userEvent.setup();

    render(<CityList cities={[DEFAULT_CITY, anotherCity]} />);

    await user.click(screen.getByText(DEFAULT_CITY.name));

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('should dispatch changeCity and reset sorting on city change', async () => {
    const user = userEvent.setup();

    render(<CityList cities={[DEFAULT_CITY, anotherCity]} />);

    await user.click(screen.getByText(anotherCity.name));

    expect(dispatchMock).toHaveBeenCalledWith(changeCity(anotherCity));
    expect(dispatchMock).toHaveBeenCalledWith(changeSorting(DEFAULT_SORTING));
  });
});
