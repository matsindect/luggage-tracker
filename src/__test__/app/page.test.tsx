import React from 'react';
import { render, screen} from '@testing-library/react';
import Home from '@/app/page';
import * as luggageHook from '@/hooks/useLuggage';

// Mock the useLuggage hook
jest.mock('@/hooks/useLuggage');

describe('Home Page', () => {
  beforeEach(() => {
    // Mock implementation of useLuggage
    jest.spyOn(luggageHook, 'useLuggage').mockReturnValue({
      items: [
        {
          id: '1',
          name: 'Travel Backpack',
          destination: 'Barcelona',
          createdAt: new Date()
        }
      ],
      loading: false,
      error: null,
      addItem: jest.fn(),
      deleteItem: jest.fn()
    });
  });

  it('renders the page title', () => {
    render(<Home />);
    
    expect(screen.getByText('Luggage Tracker')).toBeInTheDocument();
  });

  it('renders both the form and list sections', () => {
    render(<Home />);
    
    expect(screen.getByText('Add New Item')).toBeInTheDocument();
    expect(screen.getByText('Your Luggage Items')).toBeInTheDocument();
  });

  it('displays error message when there is an error', async () => {
    // Override the mock to return an error
    jest.spyOn(luggageHook, 'useLuggage').mockReturnValue({
      items: [],
      loading: false,
      error: 'Failed to load items',
      addItem: jest.fn(),
      deleteItem: jest.fn()
    });
    
    render(<Home />);
    
    expect(screen.getByText('Failed to load items')).toBeInTheDocument();
  });

  it('shows luggage items from the hook', () => {
    render(<Home />);
    
    expect(screen.getByText('Travel Backpack')).toBeInTheDocument();
    expect(screen.getByText(/barcelona/i)).toBeInTheDocument();
  });
});
