import {memo, useCallback, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity, changeSorting} from '../../store/settings-process/settings-process';
import {City} from '../../types/city.ts';
import {SortingOption} from '../../const.ts';
import {fetchOffersAction} from '../../store/api-actions.ts';
import {getCurrentCity} from '../../store/settings-process/selectors.ts';

type CityListProps = {
  cities: City[];
}

function CityListComponent({cities}: CityListProps) {
  const citiesNames = useMemo(() => cities.map((city) => city.name), [cities]);
  const currentCity = useAppSelector(getCurrentCity);

  const cityMap = useMemo(() => Object.fromEntries(
    cities.map((city) => [city.name, city])
  ), [cities]);

  const dispatch = useAppDispatch();

  const cityClickHandle = useCallback((cityName: City['name']) => {
    dispatch(changeCity(cityMap[cityName]));
    dispatch(fetchOffersAction(cityName));
    dispatch(changeSorting(SortingOption.Popular));
  }, [dispatch, cityMap]);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {citiesNames.map((name) => (
            <li key={name} className="locations__item">
              <a className={`locations__item-link tabs__item ${currentCity.name === name ? 'tabs__item--active' : ''}`}
                onClick={() => cityClickHandle(name)}
              >
                <span>{name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const CityList = memo(CityListComponent);

export default CityList;
