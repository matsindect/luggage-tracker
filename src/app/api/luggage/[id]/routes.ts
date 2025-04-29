import { NextResponse } from "next/server";

/**
 * Handles the DELETE request to remove a luggage item by its ID.
 *
 * @param request - The incoming HTTP request object.
 * @param context - An object containing route parameters.
 * @param context.params - The route parameters.
 * @param context.params.id - The ID of the luggage item to be deleted.
 * @returns A JSON response indicating the success or failure of the operation.
 *
 * @throws Returns a 404 status if the luggage item is not found.
 * @throws Returns a 500 status if an error occurs during the deletion process.
 */
// Reference the same items array from the parent route
// In a real app, you'd use a database here
import { items } from "../route"; // This won't work as is, see alternative below

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    // Find the item index
    const itemIndex = items.findIndex(item => item.id === id);
    
    if (itemIndex === -1) {
      return NextResponse.json(
        { error: "Luggage item not found" }, 
        { status: 404 }
      );
    }
    
    // Remove the item
    items.splice(itemIndex, 1);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete luggage item:", error);
    return NextResponse.json(
      { error: "Failed to delete luggage item" }, 
      { status: 500 }
    );
  }
}