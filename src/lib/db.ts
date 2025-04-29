import { LuggageItem } from "@/types";

const DB_KEY = "luggage-tracker-items";

/**
 * Get all luggage items from localStorage
 */
export const getAllItems = (): LuggageItem[] => {
  if (typeof window === "undefined") return [];
  
  try {
    const items = localStorage.getItem(DB_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Failed to parse luggage items:", error);
    return [];
  }
};

/**
 * Add a new luggage item to localStorage
 */
export const addItem = (item: Omit<LuggageItem, "id" | "createdAt">): LuggageItem => {
  const items = getAllItems();
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
  const filteredItems = items.filter(item => item.id !== id);
  
  if (filteredItems.length === items.length) {
    return false; // Item not found
  }
    if (typeof window !== 'undefined') {
        localStorage.setItem(DB_KEY, JSON.stringify(filteredItems));
    }
  return true;
};
