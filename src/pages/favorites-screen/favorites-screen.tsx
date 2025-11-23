import Favorites from '../../components/favorites/favorites.tsx';
import Footer from '../../components/footer/footer.tsx';
import Header from '../../components/header/header.tsx';


function FavoritesScreen(): JSX.Element {
  return (
    <div className="page">
      <Header isMain={false}/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <Favorites/>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default FavoritesScreen;
