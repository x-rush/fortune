import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import App from './App';

describe('App', () => {
  test('renders main app', () => {
    render(<App />);
    const titleElement = screen.getByText(/indexoob/i);
    expect(titleElement).toBeInTheDocument();
  });
});
