import React from 'react';
import { motion } from 'framer-motion';

/**
 * Neumorphic Card Component
 * A soft, extruded card that appears to push through the surface
 */
const NeumorphicCard = ({ 
  children, 
  className = '',
  padding = 'lg',
  hover = true,
  onClick,
  ...props 
}) => {
  // Padding variants
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const cardClasses = `
    bg-neu-base
    rounded-xl
    transition-all
    duration-300
    ease-in-out
    ${onClick ? 'cursor-pointer' : ''}
    ${hover ? 'shadow-neu-raised hover:shadow-neu-hover' : 'shadow-neu-raised'}
    ${paddingClasses[padding]}
    ${className}
  `;

  const motionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30 
    },
    ...(hover && {
      whileHover: { 
        scale: 1.02,
        transition: { duration: 0.2 }
      }
    }),
    ...(onClick && {
      whileTap: { scale: 0.98 }
    })
  };

  return (
    <motion.div
      className={cardClasses}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default NeumorphicCard;