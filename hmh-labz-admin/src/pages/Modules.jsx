import React from 'react';

const Placeholder = ({ name }) => (
  <div className='flex flex-col items-center justify-center min-h-[60vh] text-center'>
    <div className='w-20 h-20 bg-[#e8e1d4] rounded-full flex items-center justify-center mb-6'>
      <span className='text-3xl font-serif italic text-[#c84b21]'>{name[0]}</span>
    </div>
    <h3 className='text-2xl font-bold tracking-tight'>{name} Module</h3>
    <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mt-2'>Under Construction for Phase 2</p>
  </div>
);

export const Pages = () => <Placeholder name='Site Pages' />;
export const Sync = () => <Placeholder name='HubSpot Sync' />;
export const Legal = () => <Placeholder name='Legal Compliance' />;
export const Settings = () => <Placeholder name='Settings' />;
