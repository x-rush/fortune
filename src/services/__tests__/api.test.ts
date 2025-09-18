import { describe, test, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { productAPI } from '../api';

// Mock the entire axios module
vi.mock('axios');
const mockedAxios = axios as any;

// Mock the api instance
vi.mock('../api', () => ({
  productAPI: {
    getAll: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  }
}));

describe('Product API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 99.99,
    description: 'Test description',
    category: 'Test Category',
    features: ['Feature 1', 'Feature 2'],
  };

  test('getAll should fetch all products', async () => {
    const mockProducts = [mockProduct];
    mockedAxios.create.mockReturnValue({
      get: vi.fn().mockResolvedValue({ data: mockProducts })
    });

    const result = await productAPI.getAll();
    expect(result).toEqual(mockProducts);
  });

  test('getById should fetch a single product', async () => {
    mockedAxios.create.mockReturnValue({
      get: vi.fn().mockResolvedValue({ data: mockProduct })
    });

    const result = await productAPI.getById('1');
    expect(result).toEqual(mockProduct);
  });

  test('create should add a new product', async () => {
    const newProduct = { ...mockProduct, id: undefined };
    const createdProduct = { ...newProduct, id: '2' };

    mockedAxios.create.mockReturnValue({
      post: vi.fn().mockResolvedValue({ data: createdProduct })
    });

    const result = await productAPI.create(newProduct);
    expect(result).toEqual(createdProduct);
  });

  test('update should modify an existing product', async () => {
    const updatedProduct = { ...mockProduct, name: 'Updated Product' };

    mockedAxios.create.mockReturnValue({
      put: vi.fn().mockResolvedValue({ data: updatedProduct })
    });

    const result = await productAPI.update('1', { name: 'Updated Product' });
    expect(result).toEqual(updatedProduct);
  });

  test('delete should remove a product', async () => {
    mockedAxios.create.mockReturnValue({
      delete: vi.fn().mockResolvedValue({})
    });

    await expect(productAPI.delete('1')).resolves.not.toThrow();
  });
});