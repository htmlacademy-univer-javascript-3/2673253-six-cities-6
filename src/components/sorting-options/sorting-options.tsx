import {useAppDispatch, useAppSelector} from '../../hooks';
import {SortingOption} from '../../const.ts';
import {changeSortingAction} from '../../store/actions.ts';


function SortingOptions() {
  const currentOption = useAppSelector((state) => state.sorting);
  const options = Object.values(SortingOption);

  const dispatch = useAppDispatch();

  return(
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {currentOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {
          options.map((option) => (
            <li
              key={option}
              className={`places__option ${option === currentOption ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => dispatch(changeSortingAction(option))}
            >
              {option}
            </li>
          ))
        }
      </ul>
    </form>

  );
}


export default SortingOptions;
