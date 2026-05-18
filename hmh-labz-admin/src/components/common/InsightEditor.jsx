import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import client from '../../api/client';
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Code, Link as LinkIcon, ImageIcon, Undo, Redo, Minus,
} from 'lucide-react';

const ToolbarButton = ({ onClick, active, children, title }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`p-2.5 rounded-xl transition-all ${
      active
        ? 'bg-brand-charcoal text-white shadow-md'
        : 'text-gray-400 hover:bg-gray-100 hover:text-brand-charcoal'
    }`}
  >
    {children}
  </button>
);

const InsightEditor = ({ content, value, onChange }) => {
  const initialContent = value !== undefined ? value : (content || '');
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({
        placeholder: 'Start writing your insight...',
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none min-h-[400px] outline-none px-8 py-6 font-medium leading-relaxed text-brand-charcoal',
      },
    },
  });

  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    } else if (editor && content !== undefined && content !== editor.getHTML()) {
      editor.commands.setContent(content || '');
    }
  }, [editor, value, content]);

  if (!editor) return null;

  const addImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;
      try {
        const res = await client.post(`/upload?filename=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`, file, {
          headers: { 'Content-Type': file.type }
        });
        editor.chain().focus().setImage({ src: res.data.url }).run();
      } catch (err) {
        alert('Failed to upload image');
      }
    };
    input.click();
  };

  const addLink = () => {
    const url = prompt('Enter the URL:');
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  return (
    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
        Content
      </label>

      <div className="border border-black/5 rounded-[24px] overflow-hidden bg-white">
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-3 border-b border-black/5 bg-gray-50/50 flex-wrap">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="Bold"
          >
            <Bold size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="Italic"
          >
            <Italic size={16} />
          </ToolbarButton>

          <div className="w-[1px] h-6 bg-gray-200 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
            title="Heading 2"
          >
            <Heading2 size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive('heading', { level: 3 })}
            title="Heading 3"
          >
            <Heading3 size={16} />
          </ToolbarButton>

          <div className="w-[1px] h-6 bg-gray-200 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <List size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="Ordered List"
          >
            <ListOrdered size={16} />
          </ToolbarButton>

          <div className="w-[1px] h-6 bg-gray-200 mx-1" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive('codeBlock')}
            title="Code Block"
          >
            <Code size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={addLink} active={editor.isActive('link')} title="Link">
            <LinkIcon size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={addImage} title="Insert Image">
            <ImageIcon size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Divider"
          >
            <Minus size={16} />
          </ToolbarButton>

          <div className="flex-grow" />

          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo"
          >
            <Undo size={16} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo"
          >
            <Redo size={16} />
          </ToolbarButton>
        </div>

        {/* Editor Area */}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default InsightEditor;
