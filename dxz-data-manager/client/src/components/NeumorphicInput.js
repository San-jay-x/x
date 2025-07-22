import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Neumorphic Input Component
 * A soft, inset input field with glow effect on focus
 */
const NeumorphicInput = ({ 
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  error = '',
  icon,
  className = '',
  onFocus,
  onBlur,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const inputClasses = `
    w-full
    bg-neu-base
    px-4
    py-3
    rounded-xl
    border-0
    outline-none
    transition-all
    duration-300
    ease-in-out
    placeholder-gray-500
    text-gray-700
    ${isFocused ? 'shadow-neu-glow' : 'shadow-neu-pressed'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
    ${error ? 'shadow-neu-pressed border-2 border-accent-danger/30' : ''}
    ${icon ? 'pl-12' : ''}
    ${className}
  `;

  return (
    <div className="relative">
      {/* Label */}
      {label && (
        <motion.label
          className={`
            block text-sm font-medium mb-2 
            ${isFocused ? 'text-accent-primary' : 'text-gray-600'}
            transition-colors duration-200
          `}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isFocused ? 1 : 0.7 }}
        >
          {label}
        </motion.label>
      )}

      {/* Input container */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className={`
            absolute left-4 top-1/2 transform -translate-y-1/2 z-10
            ${isFocused ? 'text-accent-primary' : 'text-gray-500'}
            transition-colors duration-200
          `}>
            {icon}
          </div>
        )}

        {/* Input field */}
        <motion.input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          onFocus={handleFocus}
          onBlur={handleBlur}
          whileFocus={{ scale: 1.01 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }}
          {...props}
        />

        {/* Focus ring effect */}
        <motion.div
          className={`
            absolute inset-0 rounded-xl pointer-events-none
            ${isFocused ? 'ring-2 ring-accent-primary/20' : ''}
          `}
          initial={{ opacity: 0 }}
          animate={{ opacity: isFocused ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Error message */}
      {error && (
        <motion.p
          className="text-accent-danger text-sm mt-2 flex items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <svg 
            className="w-4 h-4 mr-1" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default NeumorphicInput;