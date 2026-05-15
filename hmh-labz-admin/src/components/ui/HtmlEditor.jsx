import React from 'react';
import Editor from '@monaco-editor/react';

const HtmlEditor = ({ value, onChange }) => {
  return (
    <div className="group relative border-2 border-[#00ff00]/20 hover:border-[#00ff00]/50 transition-all duration-500 rounded-xl overflow-hidden bg-[#0a0a0a] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#00ff00]/10 bg-[#111]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00ff00] animate-pulse"></div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00ff00]/70 font-bold">
            Raw HTML Markup Editor
          </span>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-white/10"></div>
          <div className="w-2 h-2 rounded-full bg-white/10"></div>
          <div className="w-2 h-2 rounded-full bg-white/10"></div>
        </div>
      </div>

      <div className="h-[400px]">
        <Editor
          height="100%"
          defaultLanguage="html"
          defaultValue={value}
          value={value}
          theme="vs-dark"
          onChange={onChange}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: "'Geist Mono', monospace",
            lineHeight: 1.6,
            padding: { top: 20 },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            backgroundColor: '#0a0a0a'
          }}
        />
      </div>

      {/* Decorative Scanline */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
    </div>
  );
};

export default HtmlEditor;
