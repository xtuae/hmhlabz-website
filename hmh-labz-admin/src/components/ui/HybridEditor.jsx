import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Editor from '@monaco-editor/react';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading2, 
  Link as LinkIcon, 
  Code as CodeIcon, 
  Eye,
  Undo,
  Redo
} from 'lucide-react';

const ToolbarButton = ({ onClick, active, children, title }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`p-2 rounded-lg transition-all ${
      active 
        ? 'bg-[#c84b21] text-white shadow-lg shadow-[#c84b21]/20' 
        : 'text-gray-500 hover:bg-gray-100 hover:text-[#1a1a1a]'
    }`}
  >
    {children}
  </button>
);

const HybridEditor = ({ value, onChange }) => {
  const [mode, setMode] = useState('visual'); // 'visual' | 'code'

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#c84b21] underline underline-offset-4',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (mode === 'visual') {
        onChange(html);
      }
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[400px] p-6 text-[#1a1a1a]',
      },
    },
  });

  // Sync state from code editor or external prop
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const toggleMode = () => {
    setMode(prev => prev === 'visual' ? 'code' : 'visual');
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  if (!editor) return null;

  return (
    <div className="border border-black/5 rounded-[2rem] bg-white overflow-hidden shadow-sm flex flex-col h-full">
      {/* Header / Mode Toggle */}
      <div className="bg-gray-50/50 px-6 py-4 border-b border-black/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${mode === 'visual' ? 'bg-[#c84b21] animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] opacity-60">
            {mode === 'visual' ? 'Visual Interface' : 'HTML Terminal'}
          </span>
        </div>
        
        <div className="flex bg-white border border-black/5 rounded-xl p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setMode('visual')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              mode === 'visual' ? 'bg-[#1a1a1a] text-white shadow-lg' : 'text-gray-400 hover:text-[#1a1a1a]'
            }`}
          >
            <Eye size={12} /> Visual
          </button>
          <button
            type="button"
            onClick={() => setMode('code')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              mode === 'code' ? 'bg-[#1a1a1a] text-white shadow-lg' : 'text-gray-400 hover:text-[#1a1a1a]'
            }`}
          >
            <CodeIcon size={12} /> Code
          </button>
        </div>
      </div>

      {/* Toolbar (Visual Mode Only) */}
      {mode === 'visual' && (
        <div className="px-6 py-3 border-b border-black/5 flex flex-wrap items-center gap-1.5 bg-white">
          <ToolbarButton 
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
          >
            <Bold size={18} />
          </ToolbarButton>
          <ToolbarButton 
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
          >
            <Italic size={18} />
          </ToolbarButton>
          <div className="w-px h-6 bg-black/5 mx-1"></div>
          <ToolbarButton 
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
          >
            <Heading2 size={18} />
          </ToolbarButton>
          <div className="w-px h-6 bg-black/5 mx-1"></div>
          <ToolbarButton 
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
          >
            <List size={18} />
          </ToolbarButton>
          <ToolbarButton 
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
          >
            <ListOrdered size={18} />
          </ToolbarButton>
          <div className="w-px h-6 bg-black/5 mx-1"></div>
          <ToolbarButton onClick={setLink} active={editor.isActive('link')}>
            <LinkIcon size={18} />
          </ToolbarButton>
          <div className="flex-grow"></div>
          <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
            <Undo size={18} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
            <Redo size={18} />
          </ToolbarButton>
        </div>
      )}

      {/* Editor Content Area */}
      <div className="flex-grow overflow-auto bg-white min-h-[500px]">
        {mode === 'visual' ? (
          <EditorContent editor={editor} />
        ) : (
          <Editor
            height="100%"
            defaultLanguage="html"
            theme="vs-dark"
            value={value}
            onChange={(val) => onChange(val || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              wordWrap: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 24, bottom: 24 }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HybridEditor;
