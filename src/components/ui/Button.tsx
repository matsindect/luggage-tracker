
interface ButtonProps {
    readonly children: React.ReactNode;
    readonly type?: "button" | "submit" | "reset";
    readonly variant?: "primary" | "danger";
    readonly onClick?: () => void;
    readonly disabled?: boolean;
  }
  
/**
 * A reusable button component with support for different variants and states.
 *
 * @param {React.ReactNode} children - The content to be displayed inside the button.
 * @param {"button" | "submit" | "reset"} [type="button"] - The type of the button element.
 * @param {"primary" | "danger"} [variant="primary"] - The visual style of the button.
 * @param {() => void} [onClick] - The callback function to handle button clicks.
 * @param {boolean} [disabled=false] - Whether the button is disabled.
 *
 * @returns {JSX.Element} A styled button element.
 */
export function Button({ 
    children, 
    type = "button", 
    variant = "primary", 
    onClick, 
    disabled = false, 
    icon: Icon 
}: ButtonProps & { icon?: React.ComponentType<{ className?: string }> }) {
    const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2";
    const variantClasses = {
        primary: "button-color hover:bg-blue-600 text-white focus:ring-blue-500",
        danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {Icon && <Icon className="w-5 h-5 mr-2" />}
            {children}
        </button>
    );
}
  