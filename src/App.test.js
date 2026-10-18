import { render, screen } from '@testing-library/react';
import App from './App';

test('renders components showcase', () => {
  render(<App />);
  expect(screen.getByText(/react components showcase/i)).toBeInTheDocument();
});
