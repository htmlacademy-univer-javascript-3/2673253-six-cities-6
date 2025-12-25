import React from 'react';
import {useState} from 'react';
import {addCommentAction} from '../../store/api-actions.ts';
import {useAppDispatch} from '../../hooks';
import {MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH, RATING_STARS, RATING_TITLES} from '../../const.ts';

type ReviewFormProps = {
  offerId: string;
};

function ReviewForm({offerId}: ReviewFormProps) : JSX.Element {
  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
  });

  const dispatch = useAppDispatch();

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: Number(event.target.value),
    }));
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      comment: event.target.value,
    }));
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    await dispatch(addCommentAction({
      id: offerId,
      rating: formData.rating,
      comment: formData.comment,
    })).unwrap();


    setFormData({
      rating: 0,
      comment: '',
    });
  };

  const isFormValid = formData.rating > 0 && formData.comment.length >= MIN_REVIEW_LENGTH && formData.comment.length <= MAX_REVIEW_LENGTH;

  return (
    <form className="reviews__form form" method="post" onSubmit={(event) => void handleSubmit(event)}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_STARS.map((star) => (
          <React.Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              checked={formData.rating === star}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title={RATING_TITLES[star]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleCommentChange}
        maxLength={MAX_REVIEW_LENGTH}
        minLength={MIN_REVIEW_LENGTH}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
