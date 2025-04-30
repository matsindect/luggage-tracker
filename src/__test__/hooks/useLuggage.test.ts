import { renderHook, act } from '@testing-library/react';
import { useLuggage } from '@/hooks/useLuggage';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('useLuggage hook', () => {
  beforeEach(() => {
    // Clear localStorage and reset mocks before each test
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  it('should initialize with empty items', () => {
    const { result } = renderHook(() => useLuggage());
    
    expect(result.current.items).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should add a luggage item', async () => {
    const { result } = renderHook(() => useLuggage());
    
    await act(async () => {
      await result.current.addItem('Backpack', 'Tokyo');
    });
    
    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].name).toBe('Backpack');
    expect(result.current.items[0].destination).toBe('Tokyo');
    expect(mockLocalStorage.setItem).toHaveBeenCalled();
  });

  it('should delete a luggage item', async () => {
    const { result } = renderHook(() => useLuggage());
    
    // Add an item first
    await act(async () => {
      await result.current.addItem('Suitcase', 'Paris');
    });
    
    const itemId = result.current.items[0].id;
    
    // Delete the item
    await act(async () => {
      await result.current.deleteItem(itemId);
    });
    
    expect(result.current.items.length).toBe(0);
    expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(2);
  });
});