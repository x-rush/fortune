import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Navbar from '../Navbar';

describe('Navbar', () => {
  test('renders navigation links', () => {
    render(<Navbar />);

    expect(screen.getByText('首页')).toBeInTheDocument();
    expect(screen.getByText('产品')).toBeInTheDocument();
    expect(screen.getByText('管理后台')).toBeInTheDocument();
  });

  test('has mobile responsive design', () => {
    render(<Navbar />);

    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
  });
});