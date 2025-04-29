import { LuggageItem as LuggageItemType } from "@/types";
import { LuggageItem } from "@/components/LuggageItem";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface LuggageListProps {
  items: LuggageItemType[];
  onDelete: (id: string) => Promise<void>;
  loading: boolean;
}

/**
 * A React component that renders a list of luggage items.
 * 
 * @param {LuggageListProps} props - The props for the component.
 * @param {Array<LuggageItem>} props.items - An array of luggage items to display.
 * @param {(id: string) => void} props.onDelete - A callback function to handle the deletion of a luggage item.
 * @param {boolean} props.loading - A flag indicating whether the data is still loading.
 * 
 * @returns {JSX.Element} The rendered luggage list or appropriate fallback UI.
 * 
 * - If `loading` is true, a loading spinner is displayed.
 * - If `items` is an empty array, a message indicating no luggage items is displayed.
 * - Otherwise, a list of `LuggageItem` components is rendered.
 */
export function LuggageList({ items, onDelete, loading }: LuggageListProps) {
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No luggage items found. Add some to get started!
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <LuggageItem 
          key={item.id} 
          item={item} 
          onDelete={onDelete} 
          loading={loading} 
        />
      ))}
    </div>
  );
}