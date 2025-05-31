import { cn } from "@/lib/utils"
import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "default"
  size?: "sm" | "md" | "lg" | "default" | "icon"
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isLoading?: boolean
}

// Export buttonVariants for compatibility with other components
export const buttonVariants = (variant: string = "default", size: string = "default") => {
  const baseStyles = "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#112250] transition-all duration-150 ease-in-out inline-flex items-center justify-center";

  const variantStyles = {
    primary: "bg-[#E0B58F] hover:bg-[#d3a57e] text-[#112250] focus:ring-[#E0B58F]",
    secondary: "bg-[#3C507D] hover:bg-[#2f4266] text-[#F5F0E9] focus:ring-[#3C507D]",
    default: "bg-[#E0B58F] hover:bg-[#d3a57e] text-[#112250] focus:ring-[#E0B58F]",
    outline: "border border-[#E0B58F] text-[#E0B58F] hover:bg-[#E0B58F]/10 focus:ring-[#E0B58F]",
    ghost: "text-[#E0B58F] hover:bg-[#E0B58F]/10 focus:ring-[#E0B58F]",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    default: "px-4 py-2 text-base",
    icon: "h-9 w-9 p-0",
  };

  return cn(baseStyles, variantStyles[variant as keyof typeof variantStyles] || variantStyles.default, sizeStyles[size as keyof typeof sizeStyles] || sizeStyles.default);
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  isLoading = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#112250] transition-all duration-150 ease-in-out inline-flex items-center justify-center"

  // Brand color palette
  // Royal Blue: #112250 (Primary Dark BG)
  // Sapphire: #3C507D (Secondary Dark, Cards)
  // Quicksand: #E0B58F (Accent, Buttons)
  // Swan Wing: #F5F0E9 (Light Text)
  // Shellstone: #D9CBC2 (Subtle Text, Borders)

  const variantStyles = {
    primary:
      "bg-[#E0B58F] hover:bg-[#d3a57e] text-[#112250] focus:ring-[#E0B58F]",
    secondary:
      "bg-[#3C507D] hover:bg-[#2f4266] text-[#F5F0E9] focus:ring-[#3C507D]",
    default:
      "bg-[#E0B58F] hover:bg-[#d3a57e] text-[#112250] focus:ring-[#E0B58F]",
    outline:
      "border border-[#E0B58F] text-[#E0B58F] hover:bg-[#E0B58F]/10 focus:ring-[#E0B58F]",
    ghost:
      "text-[#E0B58F] hover:bg-[#E0B58F]/10 focus:ring-[#E0B58F]",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  }

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    default: "px-4 py-2 text-base",
    icon: "h-9 w-9 p-0",
  }

  const loadingStyles = isLoading ? "opacity-75 cursor-not-allowed" : ""

  // Loader color adjustment
  const getLoaderColorClass = () => {
    if (variant === "primary") {
      return "text-[#112250]"
    } else if (variant === "secondary" || variant === "danger") {
      return "text-white"
    }
    return "text-[#E0B58F]"
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${loadingStyles} ${className}`}
      disabled={isLoading || props.disabled}
      aria-busy={isLoading}
      aria-disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <span
          className={`inline-block border-2 border-transparent rounded-full animate-spin -ml-1 mr-3 ${getLoaderColorClass()}`}
          style={{
            width: 16,
            height: 16,
            borderTopColor:
              variant === "primary"
                ? "#112250"
                : variant === "secondary" || variant === "danger"
                ? "#ffffff"
                : "#E0B58F",
            borderRightColor:
              variant === "primary"
                ? "#11225040"
                : variant === "secondary" || variant === "danger"
                ? "#ffffff40"
                : "#E0B58F40",
            animationDuration: "0.5s",
          }}
          aria-hidden="true"
        />
      )}
      {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
      <span className="truncate">{children}</span>
      {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
    </button>
  )
}

// Export both default and named exports for compatibility
export default Button
export { Button }
