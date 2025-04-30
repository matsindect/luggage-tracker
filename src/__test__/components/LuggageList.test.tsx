// This test file is for the LuggageList component.
// It tests the rendering of the component based on different states: loading, empty, and populated with items.
import React from 'react';
import { render, screen } from '@testing-library/react';
import { LuggageList } from '@/components/LuggageList';
import { LuggageItem as LuggageItemType } from '@/types';

describe('LuggageList', () => {
  const mockItems: LuggageItemType[] = [
    {
      id: '1',
      name: 'Backpack',
      destination: 'Tokyo',
      createdAt: new Date('2023-01-01')
    },
    {
      id: '2',
      name: 'Suitcase',
      destination: 'Paris',
      createdAt: new Date('2023-01-02')
    }
  ];
  
  const mockOnDelete = jest.fn();

  it('renders loading spinner when loading', () => {
    render(<LuggageList items={[]} onDelete={mockOnDelete} loading={true} />);
    
    // Check for loading spinner (since it's a div with an animation class)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders empty state message when no items', () => {
    render(<LuggageList items={[]} onDelete={mockOnDelete} loading={false} />);
    
    expect(screen.getByText(/no luggage items found/i)).toBeInTheDocument();
  });

  it('renders all luggage items', () => {
    render(<LuggageList items={mockItems} onDelete={mockOnDelete} loading={false} />);
    
    expect(screen.getByText('Backpack')).toBeInTheDocument();
    expect(screen.getByText('Suitcase')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /delete/i })).toHaveLength(2);
  });
});
