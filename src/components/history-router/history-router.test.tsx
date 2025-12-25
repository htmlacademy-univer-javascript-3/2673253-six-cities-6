import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {Routes, Route, useLocation} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {act} from 'react-dom/test-utils';
import HistoryRouter from './history-router.tsx';

function LocationViewer() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

describe('Component: HistoryRouter', () => {
  it('should render children and react to history changes', () => {
    const history = createMemoryHistory({initialEntries: ['/']});

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path="*" element={<LocationViewer />} />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByTestId('location')).toHaveTextContent('/');

    act(() => history.push('/next'));

    expect(screen.getByTestId('location')).toHaveTextContent('/next');
  });
});
