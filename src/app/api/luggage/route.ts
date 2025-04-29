import { NextResponse } from "next/server";
import { LuggageItem } from "@/types";

/**
 * Handles the GET request to fetch all luggage items.
 *
 * @returns {Promise<NextResponse>} A JSON response containing the list of luggage items
 * or an error message if the operation fails.
 *
 * @throws {Error} Returns a 500 status code with an error message if fetching luggage items fails.
 */

// We'll use a simple in-memory store for the server-side API since localStorage is not available
// in server-side code. In a real app, you'd use a database here
// In-memory store for luggage items

export const items: LuggageItem[] = [];

export async function GET() {
  try {
    // Return the in-memory items
    return NextResponse.json({ items });
  } catch (error) {
    console.error("Failed to fetch luggage items:", error);
    return NextResponse.json({ error: "Failed to fetch luggage items" }, { status: 500 });
  }
}

/**
 * Handles the POST request to add a new luggage item.
 *
 * @param {Request} request - The incoming HTTP request object.
 * @returns {Promise<Response>} A JSON response containing the newly added luggage item
 * or an error message with the appropriate HTTP status code.
 *
 * @throws {Error} If there is an issue parsing the request body or adding the luggage item.
 *
 * The function expects the request body to be a JSON object with the following properties:
 * - `name` (string): The name of the luggage item. This field is required.
 * - `destination` (string): The destination of the luggage item. This field is required.
 *
 * Response:
 * - On success (status 201): Returns a JSON object containing the newly added item.
 * - On client error (status 400): Returns a JSON object with an error message if required fields are missing.
 * - On server error (status 500): Returns a JSON object with an error message if an unexpected error occurs.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, destination } = body;
    
    if (!name || !destination) {
      return NextResponse.json(
        { error: "Name and destination are required" }, 
        { status: 400 }
      );
    }
    
    // Create a new item
    const newItem = {
      id: Math.random().toString(36).substring(2, 15),
      name,
      destination,
      createdAt: new Date()
    };
    
    // Add it to our in-memory store
    items.push(newItem);
    
    return NextResponse.json({ item: newItem }, { status: 201 });
  } catch (error) {
    console.error("Failed to add luggage item:", error);
    return NextResponse.json(
      { error: "Failed to add luggage item" }, 
      { status: 500 }
    );
  }
}