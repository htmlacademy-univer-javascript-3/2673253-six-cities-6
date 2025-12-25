import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import ReviewsList from './reviews-list.tsx';
import {MAX_REVIEWS_PER_PAGE} from '../../const.ts';
import {makeFakeReview} from '../../mocks/mock-data.ts';

vi.mock('../review-item/review-item.tsx', () => ({
  __esModule: true,
  default: ({review}: {review: {id: string}}) => <li>{review.id}</li>,
}));

describe('Component: ReviewsList', () => {
  it('should render up to MAX_REVIEWS_PER_PAGE reviews', () => {
    const reviews = Array.from({length: MAX_REVIEWS_PER_PAGE + 2}, (_, index) => makeFakeReview({id: `${index}`}));

    render(<ReviewsList reviews={reviews} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(MAX_REVIEWS_PER_PAGE);
  });
});
