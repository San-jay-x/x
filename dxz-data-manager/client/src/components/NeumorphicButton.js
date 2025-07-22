import React from 'react';
import { motion } from 'framer-motion';

/**
 * Neumorphic Button Component
 * A soft, extruded button with tactile feel
 */
const NeumorphicButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  isPressed = false,
  ...props 
}) => {
  // Size variants
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  // Color variants
  const variantClasses = {
    primary: 'text-accent-primary',
    secondary: 'text-accent-secondary',
    success: 'text-accent-success',
    warning: 'text-accent-warning',
    danger: 'text-accent-danger',
    info: 'text-accent-info',
    neutral: 'text-gray-700'
  };

  // Base classes for neumorphic button
  const baseClasses = `
    relative
    bg-neu-base
    font-medium
    rounded-xl
    border-0
    cursor-pointer
    transition-all
    duration-200
    ease-in-out
    select-none
    active:scale-95
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${isPressed ? 'shadow-neu-pressed' : 'shadow-neu-raised hover:shadow-neu-hover'}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  return (
    <motion.button
      type={type}
      className={baseClasses}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      initial={{ scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
      {...props}
    >
      {/* Highlight overlay for pressed effect */}
      <span className={`
        absolute inset-0 rounded-xl 
        ${isPressed ? 'bg-gradient-to-br from-neu-shadow-dark/20 to-neu-shadow-light/20' : ''}
      `} />
      
      {/* Button content */}
      <span className="relative z-10">
        {children}
      </span>
    </motion.button>
  );
};

export default NeumorphicButton;