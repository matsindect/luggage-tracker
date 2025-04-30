/**
 * A functional React component that renders a loading spinner.
 * 
 * This component displays a centered, animated spinner using Tailwind CSS classes.
 * It is useful for indicating loading states in the UI.
 * 
 * @returns A JSX element containing the loading spinner.
 */
export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div 
        data-testid="loading-spinner"
        className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
      ></div>
    </div>
  );
}