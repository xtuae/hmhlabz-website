import React from 'react';
import { motion } from 'framer-motion';

const Reveal = ({ children, delay = 0, className = "", direction = "up" }) => {
  const pos = direction === "up" ? { y: 24 } : direction === "down" ? { y: -24 } : direction === "left" ? { x: 24 } : { x: -24 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...pos }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.45, 0.32, 0.9] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
