export const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
export const variants = {
    primary: "bg-primary text-white hover:opacity-90 shadow-md",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
    ghost: "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-md",
};

export const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
};
