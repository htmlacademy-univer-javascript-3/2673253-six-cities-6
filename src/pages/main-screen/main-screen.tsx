import PlaceCardList from '../../components/place-list/place-list.tsx';
import Header from '../../components/header/header.tsx';
import Map from '../../components/map/map.tsx';
import {useState} from 'react';
import CityList from '../../components/city-list/city-list.tsx';
import Cities from '../../mocks/cities.ts';
import {useAppSelector} from '../../hooks';
import getPlacesLabel from '../../infrastructure/get-places-label.ts';
import SortingOptions from '../../components/sorting-options/sorting-options.tsx';
import {getOffersByCity} from '../../store/offers-process/selectors.ts';
import {getCurrentCity} from '../../store/settings-process/selectors.ts';
import MainEmpty from '../../components/main-empty/main-empty.tsx';


function MainScreen(): JSX.Element {
  const [activeId, setActiveId] = useState<string | null>(null);

  const offers = useAppSelector(getOffersByCity);
  const city = useAppSelector(getCurrentCity);
  const isEmpty = offers.length === 0;

  return (
    <div className="page page--gray page--main">
      <Header isMain/>

      <main className={`page__main page__main--index${isEmpty ? ' page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <CityList cities={Cities} />
        <div className="cities">
          {isEmpty
            ? <MainEmpty cityName={city.name} />
            : (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{getPlacesLabel(offers.length)} to stay in {city.name}</b>
                  <SortingOptions />
                  <PlaceCardList onListItemHover={setActiveId}/>
                </section>
                <div className="cities__right-section">
                  <Map locations={offers} activeId={activeId} className="cities"/>
                </div>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
