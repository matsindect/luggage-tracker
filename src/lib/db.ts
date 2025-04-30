import { LuggageItem } from "@/types";

const DB_KEY = "luggage-tracker-items";

/**
 * Get all luggage items from localStorage
 */
export const getAllItems = (): LuggageItem[] => {
  if (typeof window === "undefined") return [];
  
  try {
    const items = localStorage.getItem(DB_KEY);
    if (!items) return [];
    const parsed = JSON.parse(items);
    return parsed.map((item: LuggageItem) => ({
      ...item,
      createdAt: new Date(item.createdAt), // convert string to Date
    }));
    
  } catch (error) {
    console.log("Failed to parse luggage items:", error);
    return [];
  }
};

/**
 * Add a new luggage item to localStorage
 */
export const addItem = (item: Omit<LuggageItem, "id" | "createdAt">): LuggageItem => {
  const items = getAllItems();
  if (!items) {
    return {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }; // No items to add to
  }
  const newItem: LuggageItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date(),
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(DB_KEY, JSON.stringify([...items, newItem]));
  }
  
  return newItem;
};

/**
 * Delete a luggage item from localStorage by ID
 */
export const deleteItem = (id: string): boolean => {
  const items = getAllItems();
  if (!items) return false; // No items to delete

  const filteredItems = items.filter(item => item.id !== id);
  
  if (filteredItems.length === items.length) {
    return false; // Item not found
  }
    if (typeof window !== 'undefined') {
        localStorage.setItem(DB_KEY, JSON.stringify(filteredItems));
    }
  return true;
};
