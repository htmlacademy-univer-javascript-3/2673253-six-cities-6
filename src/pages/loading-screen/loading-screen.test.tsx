import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import LoadingScreen from './loading-screen.tsx';

describe('Page: LoadingScreen', () => {
  it('should render spinner', () => {
    const {container} = render(<LoadingScreen />);

    expect(container.querySelector('.loading-page__spinner')).toBeInTheDocument();
  });
});
