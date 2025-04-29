"use client";

import { useState, useEffect } from "react";
import { LuggageItem } from "@/types";

// Local storage key
const DB_KEY = "luggage-tracker-items";

export function useLuggage() {
  const [items, setItems] = useState<LuggageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load items from localStorage on initial mount
  useEffect(() => {
    try {
      setLoading(true);
      const storedItems = localStorage.getItem(DB_KEY);
      setItems(storedItems ? JSON.parse(storedItems) : []);
    } catch (err) {
      setError("Failed to load items from storage");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new luggage item
  const addItem = async (name: string, destination: string) => {
    try {
      setLoading(true);
      
      // Create new item
      const newItem: LuggageItem = {
        id: Math.random().toString(36).substring(2, 15),
        name,
        destination,
        createdAt: new Date()
      };
      
      // Update state and localStorage
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      localStorage.setItem(DB_KEY, JSON.stringify(updatedItems));
      
    //   return newItem;
    } catch (err) {
      setError("Failed to add item");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete a luggage item
  const deleteItem = async (id: string) => {
    try {
      setLoading(true);
      
      // Filter out the item to delete
      const updatedItems = items.filter(item => item.id !== id);
      
      // Update state and localStorage
      setItems(updatedItems);
      localStorage.setItem(DB_KEY, JSON.stringify(updatedItems));
      
    //   return true;
    } catch (err) {
      setError("Failed to delete item");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    loading,
    error,
    addItem,
    deleteItem,
  };
}