import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface LuggageFormProps {
  onSubmit: (name: string, destination: string) => Promise<void>;
  loading: boolean;
}

/**
 * A React component that renders a form for adding luggage items.
 * 
 * @component
 * @param {LuggageFormProps} props - The props for the LuggageForm component.
 * @param {(name: string, destination: string) => Promise<void>} props.onSubmit - 
 * A callback function triggered when the form is submitted. It receives the 
 * `name` and `destination` as arguments and returns a Promise.
 * @param {boolean} props.loading - A boolean indicating whether the form is in a 
 * loading state (e.g., while submitting).
 * 
 * @returns {JSX.Element} The rendered luggage form component.
 * 
 * @example
 * ```tsx
 * <LuggageForm
 *   onSubmit={async (name, destination) => {
 *     console.log(`Name: ${name}, Destination: ${destination}`);
 *   }}
 *   loading={false}
 * />
 * ```
 */
export function LuggageForm({ onSubmit, loading }: LuggageFormProps) {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");

// Handles form submission
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!name || !destination) return; // Ensure both fields are filled before proceeding
    
    await onSubmit(name, destination); // Call the onSubmit prop with the form data
    // Reset form after submission
    setName(""); // Clear the name field
    setDestination(""); // Clear the destination field
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Item Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          placeholder="Suitcase, Backpack, etc."
          required
        />
      </div>
      
      <div>
        <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
          Destination
        </label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          placeholder="Paris, Tokyo, etc."
          required
        />
      </div>
      
    <Button type="submit" disabled={loading || !name || !destination}>
      {loading ? (
        <>
        <span className="animate-spin mr-2">🔄</span> Adding...
        </>
      ) : (
        <>
        <span className="mr-2">➕</span> Add Luggage Item
        </>
      )}
    </Button>
    </form>
  );
}