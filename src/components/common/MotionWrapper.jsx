import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Scroll-triggered Animation Components using Framer Motion
 */

export const FadeIn = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.7, 
  className = '',
  distance = 35,
  once = true
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance, opacity: 0 };
      case 'down': return { y: -distance, opacity: 0 };
      case 'left': return { x: distance, opacity: 0 };
      case 'right': return { x: -distance, opacity: 0 };
      default: return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once, margin: "-40px" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1.0] // Smooth cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ZoomIn = ({ 
  children, 
  delay = 0, 
  duration = 0.7, 
  scale = 0.92,
  className = '',
  once = true 
}) => {
  return (
    <motion.div
      initial={{ scale, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once, margin: "-40px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Floating = ({ 
  children, 
  duration = 3.5, 
  y = 8, 
  className = '' 
}) => {
  return (
    <motion.div
      animate={{ y: [-y, y, -y] }}
      transition={{ 
        repeat: Infinity, 
        duration, 
        ease: "easeInOut" 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ 
  children, 
  staggerChildren = 0.15, 
  className = '',
  once = true 
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-30px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ 
  children, 
  className = '' 
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.6, ease: "easeOut" } 
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
