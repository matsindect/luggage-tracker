"use client";

import { Card } from "@/components/ui/Card";
import { LuggageForm } from "@/components/LuggageForm";
import { LuggageList } from "@/components/LuggageList";
import { useLuggage } from "@/hooks/useLuggage";

/**
 * The `Home` component serves as the main page for the Luggage Tracker application.
 * It provides functionality to add, view, and delete luggage items, while also handling
 * loading and error states.
 *
 * @component
 * @returns {JSX.Element} The rendered Home component.
 *
 * @remarks
 * - Utilizes the `useLuggage` hook to manage luggage-related state and actions.
 * - Displays a header with the application title and description.
 * - Handles error messages by displaying an alert box when an error occurs.
 * - Divides the layout into two main sections:
 *   - A form for adding new luggage items.
 *   - A list displaying existing luggage items with delete functionality.
 *
 * @dependencies
 * - `useLuggage`: Custom hook for managing luggage state.
 * - `Card`: A reusable card component for layout styling.
 * - `LuggageForm`: A form component for adding new luggage items.
 * - `LuggageList`: A list component for displaying and managing luggage items.
 *
 * @example
 * ```tsx
 * import Home from './page';
 *
 * function App() {
 *   return <Home />;
 * }
 * ```
 */
export default function Home() {
  const { items, loading, error, addItem, deleteItem } = useLuggage();

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Luggage Tracker</h1>
        <p className="text-gray-600">Keep track of all your travel items and destinations</p>
      </header>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
            <LuggageForm onSubmit={addItem} loading={loading} />
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Your Luggage Items</h2>
            <LuggageList items={items} onDelete={deleteItem} loading={loading} />
          </Card>
        </div>
      </div>
    </div>
  );
}