import React from 'react';

const InsightSkeleton = () => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden animate-pulse">
      {/* Image Block */}
      <div className="h-64 bg-white/5" />
      
      {/* Content Area */}
      <div className="p-10 space-y-6">
        {/* Meta Line */}
        <div className="flex items-center gap-3">
          <div className="w-16 h-3 bg-white/10 rounded-full" />
          <div className="w-12 h-3 bg-white/10 rounded-full" />
        </div>

        {/* Title Block */}
        <div className="space-y-3">
          <div className="w-full h-8 bg-white/10 rounded-xl" />
          <div className="w-3/4 h-8 bg-white/10 rounded-xl" />
        </div>

        {/* Excerpt Lines */}
        <div className="space-y-2 pt-4">
          <div className="w-full h-3 bg-white/5 rounded-full" />
          <div className="w-full h-3 bg-white/5 rounded-full" />
          <div className="w-2/3 h-3 bg-white/5 rounded-full" />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex justify-between items-center">
          <div className="w-24 h-4 bg-white/10 rounded-lg" />
          <div className="w-10 h-10 bg-white/10 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default InsightSkeleton;
