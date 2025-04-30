import React from 'react';
import '@testing-library/jest-dom'; // Ensure jest-dom is imported for matchers like toBeInTheDocument
import { render, screen, fireEvent } from '@testing-library/react';
import { LuggageForm } from '@/components/LuggageForm';

describe('LuggageForm', () => {
  const mockOnSubmit = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<LuggageForm onSubmit={mockOnSubmit} loading={false} />);
    
    expect(screen.getByLabelText(/item name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/destination/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add luggage item/i })).toBeInTheDocument();
  });

  it('submits the form with correct values', () => {
    render(<LuggageForm onSubmit={mockOnSubmit} loading={false} />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/item name/i), {
      target: { value: 'Carry-on' },
    });
    fireEvent.change(screen.getByLabelText(/destination/i), {
      target: { value: 'Berlin' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /add luggage item/i }));
    
    // Check that onSubmit was called with correct values
    expect(mockOnSubmit).toHaveBeenCalledWith('Carry-on', 'Berlin');
  });

  it('disables the button when loading', () => {
    render(<LuggageForm onSubmit={mockOnSubmit} loading={true} />);
    
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText(/adding.../i)).toBeInTheDocument();
  });

  it('disables the button when fields are empty', () => {
    render(<LuggageForm onSubmit={mockOnSubmit} loading={false} />);
    
    expect(screen.getByRole('button')).toBeDisabled();
  });
});