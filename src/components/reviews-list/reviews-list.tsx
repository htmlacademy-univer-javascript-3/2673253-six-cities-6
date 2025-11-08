import {Review} from '../../types/review.ts';
import ReviewItem from '../review-item/review-item.tsx';

type reviewsListProps = {
  reviews: Review[];
}

function ReviewsList({reviews} : reviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem review={review} key={review.id} />
      ))}
    </ul>
  );
}

export default ReviewsList;
