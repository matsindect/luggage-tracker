import { LuggageItem as LuggageItemType } from "@/types";
import { Button } from "@/components/ui/Button";

interface LuggageItemProps {
  item: LuggageItemType;
  onDelete: (id: string) => Promise<void>;
  loading: boolean;
}

/**
 * Component representing a single luggage item.
 *
 * @param {LuggageItemProps} props - The props for the LuggageItem component.
 * @param {Object} props.item - The luggage item data.
 * @param {string} props.item.name - The name of the luggage item.
 * @param {string} props.item.destination - The destination associated with the luggage item.
 * @param {string} props.item.createdAt - The creation date of the luggage item in ISO format.
 * @param {Function} props.onDelete - Callback function to handle the deletion of the luggage item.
 * @param {string} props.onDelete.id - The ID of the luggage item to delete.
 * @param {boolean} props.loading - Indicates whether a loading state is active, disabling the delete button.
 *
 * @returns {JSX.Element} A styled card displaying luggage item details with a delete button.
 */
export function LuggageItem({ item, onDelete, loading }: LuggageItemProps) {
  const formattedDate = new Date(item.createdAt).toLocaleDateString();
  
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow transition-shadow mt-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{item.name}</h3>
          <p className="text-gray-600">Destination: {item.destination}</p>
          <p className="text-gray-400 text-sm">Added: {new Date(item.createdAt).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</p>
        </div>
        <Button 
          variant="danger" 
          onClick={() => onDelete(item.id)}
          disabled={loading}
        >
          <span className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-4 h-4 mr-1"
            >
              <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
            Delete
          </span>
        </Button>
      </div>
    </div>
  );
}