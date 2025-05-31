// ============================================================================
// OPTIMIZED BUTTON COMPONENT
// High-performance button with animations and accessibility
// ============================================================================

import { cn } from '@/lib/utils';
import { motion, MotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React, { forwardRef } from 'react';

export interface OptimizedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<MotionProps, 'children'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
  gradient?: boolean;
  glow?: boolean;
}

const OptimizedButton = forwardRef<HTMLButtonElement, OptimizedButtonProps>(
  ({
    className,
    variant = 'default',
    size = 'default',
    loading = false,
    loadingText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    rounded = false,
    gradient = false,
    glow = false,
    children,
    disabled,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;

    const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variantClasses = {
      default: gradient
        ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70'
        : 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: gradient
        ? 'bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground hover:from-destructive/90 hover:to-destructive/70'
        : 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: gradient
        ? 'bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:from-secondary/90 hover:to-secondary/70'
        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline'
    };

    const sizeClasses = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 px-3 text-xs',
      lg: 'h-11 px-8',
      icon: 'h-10 w-10'
    };

    const glowClasses = glow ? 'shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40' : '';
    const roundedClasses = rounded ? 'rounded-full' : 'rounded-md';
    const fullWidthClasses = fullWidth ? 'w-full' : '';

    const buttonContent = (
      <>
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {!loading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        {loading ? (loadingText || 'Loading...') : children}
        {!loading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </>
    );

    const motionProps = {
      whileHover: !isDisabled ? { scale: 1.02 } : undefined,
      whileTap: !isDisabled ? { scale: 0.98 } : undefined,
      transition: { type: 'spring', stiffness: 400, damping: 17 },
      ...props
    };

    return (
      <motion.button
        className={cn(
          baseClasses,
          variantClasses[variant as keyof typeof variantClasses],
          sizeClasses[size as keyof typeof sizeClasses],
          roundedClasses,
          fullWidthClasses,
          glowClasses,
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...motionProps}
      >
        {buttonContent}
      </motion.button>
    );
  }
);

OptimizedButton.displayName = 'OptimizedButton';

// ============================================================================
// SPECIALIZED BUTTON VARIANTS
// ============================================================================

export interface IconButtonProps extends Omit<OptimizedButtonProps, 'children' | 'leftIcon' | 'rightIcon'> {
  icon: React.ReactNode;
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, ...props }, ref) => {
    return (
      <OptimizedButton
        {...props}
        ref={ref}
        size="icon"
        variant={props.variant || 'ghost'}
      >
        {icon}
      </OptimizedButton>
    );
  }
);

IconButton.displayName = 'IconButton';

export interface FloatingActionButtonProps extends OptimizedButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export const FloatingActionButton = forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  ({ position = 'bottom-right', className, ...props }, ref) => {
    const positionClasses = {
      'bottom-right': 'fixed bottom-6 right-6',
      'bottom-left': 'fixed bottom-6 left-6',
      'top-right': 'fixed top-6 right-6',
      'top-left': 'fixed top-6 left-6'
    };

    return (
      <OptimizedButton
        {...props}
        ref={ref}
        className={cn(
          positionClasses[position as keyof typeof positionClasses],
          'z-50 h-14 w-14 rounded-full shadow-lg',
          className
        )}
        size="icon"
        rounded
        glow
      />
    );
  }
);

FloatingActionButton.displayName = 'FloatingActionButton';

export interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  className
}) => {
  const orientationClasses = {
    horizontal: 'flex-row [&>*:not(:first-child)]:ml-0 [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:last-child)]:border-r-0',
    vertical: 'flex-col [&>*:not(:first-child)]:mt-0 [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none [&>*:not(:last-child)]:border-b-0'
  };

  return (
    <div className={cn(
      'inline-flex',
      orientationClasses[orientation],
      className
    )}>
      {children}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';

// ============================================================================
// BUTTON WITH TOOLTIP
// ============================================================================

export interface TooltipButtonProps extends OptimizedButtonProps {
  tooltip: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export const TooltipButton = forwardRef<HTMLButtonElement, TooltipButtonProps>(
  ({ tooltip, tooltipPosition = 'top', className, ...props }, ref) => {
    const [showTooltip, setShowTooltip] = React.useState(false);

    const tooltipPositionClasses = {
      top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
    };

    return (
      <div className="relative inline-block">
        <OptimizedButton
          {...props}
          ref={ref}
          className={className}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
        />

        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={cn(
              'absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap pointer-events-none',
              tooltipPositionClasses[tooltipPosition as keyof typeof tooltipPositionClasses]
            )}
          >
            {tooltip}
            <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45" />
          </motion.div>
        )}
      </div>
    );
  }
);

TooltipButton.displayName = 'TooltipButton';

export default OptimizedButton;
