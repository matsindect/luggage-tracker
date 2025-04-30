import { getAllItems, addItem, deleteItem } from '@/lib/db';
import { LuggageItem } from '@/types';

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
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock crypto.randomUUID
const mockRandomUUID = jest.fn(() => '123e4567-e89b-12d3-a456-426614174000');
Object.defineProperty(window, 'crypto', {
  value: { randomUUID: mockRandomUUID },
});

describe('Database Utilities', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    jest.clearAllMocks();
  });

  describe('getAllItems', () => {
    it('returns an empty array when localStorage is empty', () => {
      const items = getAllItems();
      expect(items).toEqual([]);
      expect(mockLocalStorage.getItem).toHaveBeenCalled();
    });

    it('returns parsed items from localStorage', () => {
      const mockItems: LuggageItem[] = [
        { id: '1', name: 'Item 1', destination: 'Dest 1', createdAt: new Date() }
      ];
      mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(mockItems));
      
      const items = getAllItems();
      expect(items).toEqual(mockItems);
    });

    it('returns empty array on parsing error', () => {
      mockLocalStorage.getItem.mockReturnValueOnce('invalid json');
      
      const items = getAllItems();
      expect(items).toEqual([]);
    });
  });

  describe('addItem', () => {
    it('adds a new item to localStorage', () => {
      const newItem = addItem({ name: 'New Item', destination: 'New Dest' });
      
      expect(newItem.id).toBe('123e4567-e89b-12d3-a456-426614174000');
      expect(newItem.name).toBe('New Item');
      expect(newItem.destination).toBe('New Dest');
      expect(newItem.createdAt).toBeInstanceOf(Date);
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('deleteItem', () => {
    it('deletes an item from localStorage', () => {
      // Setup existing items
      const mockItems: LuggageItem[] = [
        { id: '1', name: 'Item 1', destination: 'Dest 1', createdAt: new Date() }
      ];
      mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(mockItems));
      
      const result = deleteItem('1');
      
      expect(result).toBe(true);
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });

    it('returns false when item not found', () => {
      // Setup existing items
      const mockItems: LuggageItem[] = [
        { id: '1', name: 'Item 1', destination: 'Dest 1', createdAt: new Date() }
      ];
      mockLocalStorage.getItem.mockReturnValueOnce(JSON.stringify(mockItems));
      
      const result = deleteItem('2');
      
      expect(result).toBe(false);
    });
  });
});