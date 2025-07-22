import React from 'react';
import { motion } from 'framer-motion';

/**
 * Neumorphic Loading Spinner Component
 * A beautiful loading animation with neumorphic design
 */
const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className="min-h-screen bg-neu-base flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-6">
        {/* Neumorphic Spinner */}
        <div className="relative">
          <motion.div
            className={`${sizeClasses[size]} rounded-full border-4 border-neu-base shadow-neu-pressed`}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Spinner gradient */}
            <div 
              className={`${sizeClasses[size]} rounded-full`}
              style={{
                background: `conic-gradient(from 0deg, transparent, #667eea, transparent)`,
                mask: 'radial-gradient(circle at center, transparent 30%, black 31%)',
                WebkitMask: 'radial-gradient(circle at center, transparent 30%, black 31%)'
              }}
            />
          </motion.div>
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-neu-base rounded-full shadow-neu-raised" />
          </div>
        </div>

        {/* Loading text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <h3 className="text-lg font-futuristic text-accent-primary mb-2">
            DXZ Data Manager
          </h3>
          <p className="text-gray-600 text-sm">
            {message}
          </p>
        </motion.div>

        {/* Animated dots */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-accent-primary rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;