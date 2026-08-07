/**
 * Reusable Button component supporting primary, secondary, danger, and outline variants.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  onClick,
  className = "",
  ...props
}) {
  // Base styles applied to all button variants
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  // Size variations
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  // Color & style variants
  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 focus:ring-indigo-500 border border-transparent",
    secondary:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100 focus:ring-indigo-500",
    outline:
      "bg-transparent text-indigo-600 border border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
    danger:
      "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500 border border-transparent",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizes[size] || sizes.md} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
