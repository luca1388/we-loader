import { render, screen } from '@testing-library/react';
import App from './components/App/App';

describe('GIVEN the page is rendered', () => {
  test('THEN should be a proper title', () => {
    render(<App />);
    const title = screen.getByText(/Weekend loader/i);
    expect(title).toBeInTheDocument();
  });
  // test('AND should be a progress bar', () => {});
  // test('AND should be a percentage', () => {
  //   render(<App />);
  //   const percentage = screen.getByText(/\%/i);
  //   expect(percentage).toBeInTheDocument();
  // });
  // test('AND should be a message', () => {
  //   render(<App />);
  //   const title = screen.getByText(/Weekend loader/i);
  //   expect(title).toBeInTheDocument();
  // });
});
