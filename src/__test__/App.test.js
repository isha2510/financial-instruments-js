import { render, screen } from '@testing-library/react';
import App from '../App';


describe('App', () => {
  test('renders learn react link', () => {
    render(<App />);
    const text = screen.getByText(/Financial Instruments/i);
    expect(text).toBeInTheDocument();
  });

})
