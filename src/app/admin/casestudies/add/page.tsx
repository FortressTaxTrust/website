'use client'

import React, { useState, useRef, useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Color from '@tiptap/extension-color'
import {TextStyle} from '@tiptap/extension-text-style'
import CodeBlock from '@tiptap/extension-code-block'
import { Dropcursor } from '@tiptap/extensions'

import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaList,
  FaListOl,
  FaQuoteRight,
  FaCode,
  FaUndo,
  FaRedo,
  FaSave,
  FaTrash,
  FaLink,
  FaImage,
  FaHeading,
} from 'react-icons/fa'

interface Props {
  initialTitle?: string
  initialDescription?: string
  initialHTML?: string
}

export default function ProfessionalBlogEditor({
  initialTitle = '',
  initialDescription = '',
  initialHTML = '',
}: Props) {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [jsonContent, setJsonContent] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)


  const extensions = [ 
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      Link.configure({ openOnClick: true }),
      TextStyle,
      Color,
      Image.configure({
        resize: {
          enabled: true,
          alwaysPreserveAspectRatio: true,
        },
      }),
      Placeholder.configure({ placeholder: 'Start writing your blog...' }),
      Underline,
      CodeBlock,
      Dropcursor
    ];
  // Main Editor
  const editor = useEditor({
    extensions,
    content: initialHTML || '<p>Hello, start your blog here…</p>',
    onUpdate: ({ editor }) => setJsonContent(editor.getJSON()),
    immediatelyRender: false,
  })

  // Preview Editor (read-only)
  const previewEditor = useEditor({
    editable: false,
    extensions,
    content: initialHTML || '<p></p>',
    immediatelyRender: false,
  })

  // Sync preview with main editor
useEffect(() => {
  
  if (!editor || !previewEditor) return;

  const updatePreview = () => {
    // Use JSON instead of HTML
    previewEditor.commands.setContent(editor.getJSON());
  };

  editor.on('update', updatePreview);

  return () => { editor.off('update', updatePreview) };
}, [editor, previewEditor]);


  if (!editor) return <div>Loading editor…</div>

  const triggerFilePicker = () => fileInputRef.current?.click()

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      editor.chain().focus().setImage({ src: String(reader.result) }).run()
    }
    reader.readAsDataURL(file)
    e.currentTarget.value = ''
  }

  const toggleLink = () => {
    const url = window.prompt('Enter URL (https://...)')
    if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const insertImageFromUrl = () => {
    const url = window.prompt('Enter image URL')
    if (!url) return
    const width = window.prompt('Enter width (px or %)', '100%')
    let parsedWidth: number | undefined = undefined
    if (width) {
      const w = parseInt(width, 10)
      if (!isNaN(w)) parsedWidth = w
    }
    editor.chain().focus().setImage({ src: url, width: parsedWidth }).run()
  }

  const clearContent = () => {
    if (confirm('Clear editor content? This cannot be undone.')) editor.commands.clearContent()
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

  const savePost = async () => {
    if (!title.trim() || !jsonContent) {
      setMessage({ type: 'error', text: 'Title and content cannot be empty.' })
      return
    }
    setSaving(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/casestudies/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, jsonData: jsonContent }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err?.message || 'Failed to save post')
      }

      const data = await res.json()
      setMessage({ type: 'success', text: 'Post saved successfully!' })
      console.log('Saved post:', data)
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Something went wrong' })
    } finally {
      setSaving(false)
    }
  }

  const resizeImage = () => {
    if (!editor) return
    const url = editor.getAttributes('image').src
    const widthStr = window.prompt('Enter width (px or %)', '100%')
    const heightStr = window.prompt('Enter height (px or auto)', 'auto')

    // Parse numeric values; if not a number or "auto", leave undefined so types match the extension API
    const parsedWidth = widthStr ? parseInt(widthStr.replace('%', '').trim(), 10) : undefined
    const parsedHeight = heightStr && heightStr !== 'auto' ? parseInt(heightStr.replace('%', '').trim(), 10) : undefined
    const widthVal = typeof parsedWidth === 'number' && !isNaN(parsedWidth) ? parsedWidth : undefined
    const heightVal = typeof parsedHeight === 'number' && !isNaN(parsedHeight) ? parsedHeight : undefined

    if (url) {
      editor
        .chain()
        .focus()
        .setImage({ src: url, width: widthVal, height: heightVal })
        .run()
    }
  }


  const exportJSON = () => {
    navigator.clipboard.writeText(
      JSON.stringify({ title, description, html: editor.getHTML(), json: editor.getJSON() }, null, 2)
    )
    setMessage({ type: 'success', text: 'JSON copied to clipboard!' })
    setTimeout(() => setMessage(null), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-6">
      {/* Notification */}
      {message && (
        <div
          className={`px-4 py-2 rounded shadow ${
            message.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-sky-700 to-indigo-700 text-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-extrabold">Case Studies and Blogs</h1>
      </div>

      {/* Editor Section */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-4">
        <input
          placeholder="Title..."
          className="w-full text-3xl font-bold outline-none placeholder-gray-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Short description..."
          className="w-full resize-none text-sm text-gray-700 placeholder-gray-400 outline-none h-16"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 items-center mb-4">
          <ToolbarButton active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
            <FaBold />
          </ToolbarButton>
          <ToolbarButton active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
            <FaItalic />
          </ToolbarButton>
          <ToolbarButton active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline">
            <FaUnderline />
          </ToolbarButton>
          {[1, 2, 3, 4, 5, 6].map((lvl) => (
            <ToolbarButton
              key={lvl}
              active={editor.isActive('heading', { level: lvl as 1 | 2 | 3 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: lvl as 1 | 2 | 3 }).run()}
              title={`H${lvl}`}
            >
              H{lvl}
            </ToolbarButton>
          ))}
          <ToolbarButton active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List">
            <FaList />
          </ToolbarButton>
          <ToolbarButton active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Ordered List">
            <FaListOl />
          </ToolbarButton>
          <ToolbarButton active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Quote">
            <FaQuoteRight />
          </ToolbarButton>
          <ToolbarButton onClick={toggleLink} title="Add Link">
            <FaLink />
          </ToolbarButton>
          <ToolbarButton onClick={insertImageFromUrl} title="Image from URL">
            <FaImage />
          </ToolbarButton>
          {/* <ToolbarButton onClick={resizeImage} title="Resize Image">
            <FaImage />
          </ToolbarButton> */}
          <ToolbarButton onClick={triggerFilePicker} title="Upload Image">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
            <FaImage />
          </ToolbarButton>
          <div className="ml-auto flex gap-2">
            <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
              <FaUndo />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
              <FaRedo />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="Code">
              <FaCode />
            </ToolbarButton>
            <ToolbarButton onClick={clearContent} title="Clear">
              <FaTrash />
            </ToolbarButton>
          </div>
        </div>

        {/* Editor */}
        <div className="editor-border editor-content min-h-[400px] rounded p-4 border border-gray-200">
          <EditorContent editor={editor} />
        </div>
        

        {/* Save / Export */}
        <div className="flex gap-3 mt-3">
          <button
            onClick={savePost}
            disabled={saving}
            className={`px-4 py-2 rounded-lg text-white font-semibold shadow ${
              saving ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-700'
            }`}
          >
            <FaSave className="inline mr-2" /> {saving ? 'Saving...' : 'Save'}
          </button>
          <button onClick={exportJSON} className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50">
            Copy JSON
          </button>
            <a
                href={`data:text/html;charset=utf-8,${encodeURIComponent(editor.getHTML())}`}
                download={(title || 'post').replace(/\s+/g, '-') + '.html'}
                className="px-4 py-2 rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700"
              >
                Download HTML
              </a>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-xl shadow p-4 mt-6">
        <h3 className="font-semibold text-lg mb-2">Live Preview</h3>
        <div className="editor-content min-h-[300px] rounded p-4 border border-gray-200 mt-4">
        <EditorContent editor={previewEditor} />
      </div>
      </div>
    </div>
  )
}

// Toolbar button component
function ToolbarButton({ children, onClick, title, active = false }: any) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md border ${
        active ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-gray-700 border-gray-200'
      } hover:opacity-90`}
    >
      {children}
    </button>
  )
}
