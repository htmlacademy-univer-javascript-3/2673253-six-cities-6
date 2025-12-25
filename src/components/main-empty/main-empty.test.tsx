import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import MainEmpty from './main-empty.tsx';

describe('Component: MainEmpty', () => {
  it('should render city name', () => {
    render(<MainEmpty cityName="Paris" />);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
  });
});
