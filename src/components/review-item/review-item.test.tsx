import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import ReviewItem from './review-item.tsx';
import {makeFakeReview, makeFakeReviewUser} from '../../mocks/mock-data.ts';

describe('Component: ReviewItem', () => {
  it('should render review content', () => {
    const review = makeFakeReview({
      id: 'review-1',
      comment: 'Great stay',
      user: makeFakeReviewUser({name: 'Tester'}),
      date: '2023-01-01T00:00:00.000Z',
    });

    render(<ReviewItem review={review} />);

    expect(screen.getByText('Tester')).toBeInTheDocument();
    expect(screen.getByText('Great stay')).toBeInTheDocument();
    expect(screen.getByText('January 2023')).toBeInTheDocument();
  });
});
