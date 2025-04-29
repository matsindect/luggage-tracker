/**
 * A reusable Card component that provides a styled container for its children.
 *
 * @param {CardProps} props - The props for the Card component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the card.
 *
 * @returns {JSX.Element} A styled card container with the provided children.
 */
interface CardProps {
    children: React.ReactNode;
  }
  
  export function Card({ children }: CardProps) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
        {children}
      </div>
    );
  }