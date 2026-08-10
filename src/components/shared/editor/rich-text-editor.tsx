"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  FileCode
} from "lucide-react";
import clsx from "clsx";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import type { Editor } from "@tiptap/react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [isHtmlImportOpen, setIsHtmlImportOpen] = useState(false);
  const [htmlInput, setHtmlInput] = useState("");

  if (!editor) {
    return null;
  }

  const handleImportHtml = () => {
    if (!htmlInput.trim()) {
      toast.error("Please enter some HTML");
      return;
    }
    try {
      editor.commands.setContent(htmlInput);
      toast.success("HTML imported successfully");
      setIsHtmlImportOpen(false);
      setHtmlInput("");
    } catch {
      toast.error("Failed to parse HTML");
    }
  };

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const buttons = [
    {
      icon: <Bold size={16} />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      title: 'Bold',
    },
    {
      icon: <Italic size={16} />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      title: 'Italic',
    },
    {
      icon: <UnderlineIcon size={16} />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive('underline'),
      title: 'Underline',
    },
    {
      icon: <Strikethrough size={16} />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
      title: 'Strikethrough',
    },
    {
      icon: <Heading1 size={16} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
      title: 'Heading 1',
    },
    {
      icon: <Heading2 size={16} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
      title: 'Heading 2',
    },
    {
      icon: <Heading3 size={16} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive('heading', { level: 3 }),
      title: 'Heading 3',
    },
    {
      icon: <List size={16} />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
      title: 'Bullet List',
    },
    {
      icon: <ListOrdered size={16} />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
      title: 'Ordered List',
    },
    {
      icon: <Quote size={16} />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
      title: 'Blockquote',
    },
    {
      icon: <Code size={16} />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive('codeBlock'),
      title: 'Code Block',
    },
    {
      icon: <LinkIcon size={16} />,
      onClick: toggleLink,
      isActive: editor.isActive('link'),
      title: 'Link',
    },
    {
      icon: <FileCode size={16} />,
      onClick: () => setIsHtmlImportOpen(true),
      isActive: false,
      title: 'Import HTML',
    },
  ];

  return (
    <>
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-input bg-surface-hover/50 rounded-t-lg">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault();
              btn.onClick();
            }}
            title={btn.title}
            className={clsx(
              "p-2 rounded-md hover:bg-input transition-colors",
              btn.isActive ? "bg-input text-accent" : "text-foreground"
            )}
          >
            {btn.icon}
          </button>
        ))}
      </div>

      <Modal
        isOpen={isHtmlImportOpen}
        onClose={() => {
          setIsHtmlImportOpen(false);
          setHtmlInput("");
        }}
        title="Import HTML"
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setIsHtmlImportOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleImportHtml}>
              Import
            </Button>
          </div>
        }
      >
        <Textarea
          placeholder="Paste your raw HTML here..."
          value={htmlInput}
          onChange={(e) => setHtmlInput(e.target.value)}
          className="min-h-[300px] font-mono text-sm"
        />
      </Modal>
    </>
  );
};

export default function RichTextEditor({ value, onChange, error }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-accent underline',
        }
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[200px] p-4 text-foreground',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  return (
    <div className={clsx("flex flex-col w-full", error && "has-error")}>
      <div 
        className={clsx(
          "w-full rounded-lg border bg-card-bg shadow-sm transition-colors",
          error ? "border-red-500" : "border-input hover:border-accent/50 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent"
        )}
      >
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
}
