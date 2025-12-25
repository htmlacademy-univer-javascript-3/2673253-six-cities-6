import {Review} from '../../types/review.ts';
import ReviewItem from '../review-item/review-item.tsx';
import {MAX_REVIEWS_PER_PAGE} from '../../const.ts';

type reviewsListProps = {
  reviews: Review[];
}

function ReviewsList({reviews} : reviewsListProps): JSX.Element {
  const limitedReviews = reviews.slice(0, MAX_REVIEWS_PER_PAGE);

  return (
    <ul className="reviews__list">
      {limitedReviews.map((review) => (
        <ReviewItem review={review} key={review.id} />
      ))}
    </ul>
  );
}

export default ReviewsList;
