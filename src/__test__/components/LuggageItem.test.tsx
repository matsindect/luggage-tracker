import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LuggageItem } from '@/components/LuggageItem';
import { LuggageItem as LuggageItemType } from '@/types';

describe('LuggageItem', () => {
  const mockItem: LuggageItemType = {
    id: '123',
    name: 'Laptop Bag',
    destination: 'New York',
    createdAt: new Date('2023-01-01')
  };
  
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders item information correctly', () => {
    render(<LuggageItem item={mockItem} onDelete={mockOnDelete} loading={false} />);
    
    expect(screen.getByText('Laptop Bag')).toBeInTheDocument();
    expect(screen.getByText(/new york/i)).toBeInTheDocument();
    expect(screen.getByText(/added:/i)).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<LuggageItem item={mockItem} onDelete={mockOnDelete} loading={false} />);
    
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    
    expect(mockOnDelete).toHaveBeenCalledWith('123');
  });

  it('disables delete button when loading', () => {
    render(<LuggageItem item={mockItem} onDelete={mockOnDelete} loading={true} />);
    
    expect(screen.getByRole('button', { name: /delete/i })).toBeDisabled();
  });
});