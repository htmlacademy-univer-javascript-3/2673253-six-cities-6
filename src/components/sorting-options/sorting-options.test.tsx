import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortingOptions from './sorting-options.tsx';
import {SortingOption} from '../../const';
import {changeSorting} from '../../store/settings-process/settings-process';

const dispatchMock = vi.fn();
const useAppDispatchMock = vi.fn(() => dispatchMock);
const useAppSelectorMock = vi.fn();

vi.mock('../../hooks', () => ({
  useAppDispatch: () => useAppDispatchMock(),
  useAppSelector: () => useAppSelectorMock() as SortingOption,
}));

describe('Component: SortingOptions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAppSelectorMock.mockReturnValue(SortingOption.Popular);
  });

  it('should toggle options visibility on click', async () => {
    const user = userEvent.setup();

    render(<SortingOptions />);

    const toggle = screen.getAllByText(SortingOption.Popular)[0];
    await user.click(toggle);

    expect(screen.getByRole('list')).toHaveClass('places__options--opened');
  });

  it('should dispatch changeSorting when option selected', async () => {
    const user = userEvent.setup();

    render(<SortingOptions />);

    await user.click(screen.getAllByText(SortingOption.Popular)[0]);
    await user.click(screen.getByText(SortingOption.TopRatedFirst));

    expect(dispatchMock).toHaveBeenCalledWith(changeSorting(SortingOption.TopRatedFirst));
  });
});
