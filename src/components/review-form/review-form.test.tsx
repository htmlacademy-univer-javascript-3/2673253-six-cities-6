import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewForm from './review-form.tsx';
import {MIN_REVIEW_LENGTH} from '../../const.ts';

const dispatchMock = vi.fn();
const useAppDispatchMock = vi.fn(() => dispatchMock);
const addCommentActionMock = vi.fn((payload: {id: string; rating: number; comment: string}) => ({
  type: 'addCommentAction',
  payload,
}));

vi.mock('../../hooks', () => ({
  useAppDispatch: () => useAppDispatchMock(),
}));

vi.mock('../../store/api-actions.ts', () => ({
  addCommentAction: (payload: {id: string; rating: number; comment: string}) => addCommentActionMock(payload),
}));

describe('Component: ReviewForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    dispatchMock.mockReturnValue({unwrap: vi.fn().mockResolvedValue(undefined)});
  });

  it('should disable submit until rating and comment are provided', () => {
    render(<ReviewForm offerId="1" />);

    expect(screen.getByRole('button', {name: /submit/i})).toBeDisabled();
  });

  it('should dispatch addCommentAction on submit and reset form', async () => {
    const user = userEvent.setup();
    render(<ReviewForm offerId="1" />);

    const ratingInput = screen.getAllByRole('radio')[0];
    await user.click(ratingInput);
    await user.type(screen.getByRole('textbox'), 'a'.repeat(MIN_REVIEW_LENGTH));

    const submitButton = screen.getByRole('button', {name: /submit/i});
    expect(submitButton).toBeEnabled();

    await user.click(submitButton);

    expect(addCommentActionMock).toHaveBeenCalledWith({
      id: '1',
      rating: 5,
      comment: 'a'.repeat(MIN_REVIEW_LENGTH),
    });
    expect(dispatchMock).toHaveBeenCalled();
    await vi.waitFor(() => expect(screen.getByRole('textbox')).toHaveValue(''));
  });
});
