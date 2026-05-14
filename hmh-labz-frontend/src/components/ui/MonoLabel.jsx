import React from 'react';

const MonoLabel = ({ children, color = "ink", className = "" }) => {
  const c = color === "terra" ? "text-terra" : color === "paper" ? "text-paper/70" : "text-ink/55";
  return (
    <span className={`font-mono uppercase tracking-[0.22em] text-[10px] sm:text-[11px] font-bold ${c} ${className}`}>
      {children}
    </span>
  );
};

export default MonoLabel;
