import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {Offers} from './mocks/offers.ts';
import {Provider} from 'react-redux';
import {store} from './store';
import ErrorMessage from './components/error-message/error-message.tsx';
import {checkAuthAction, fetchOffersAction} from './store/api-actions';

const Settings = {
  Places: Offers,
} as const;

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App offers={Settings.Places}/>
    </Provider>
  </React.StrictMode>
);
