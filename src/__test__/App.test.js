import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders ', () => {
  render(<App />);
  const text = screen.getByText(/Financial Instruments/i);
  expect(text).toBeInTheDocument();
  
});
