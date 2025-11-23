import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SortingOption } from '../../const';
import { changeSortingAction } from '../../store/actions';

function SortingOptions() {
  const currentOption = useAppSelector((state) => state.sorting);
  const options = Object.values(SortingOption);

  const dispatch = useAppDispatch();

  const [isOpened, setIsOpened] = useState(false);

  const toggleOpen = () => {
    setIsOpened((prev) => !prev);
  };

  const handleSelect = (option: SortingOption) => {
    dispatch(changeSortingAction(option));
    setIsOpened(false); // закрываем
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>

      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleOpen}
      >
        {currentOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        {options.map((option) => (
          <li
            key={option}
            className={`places__option ${option === currentOption ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
