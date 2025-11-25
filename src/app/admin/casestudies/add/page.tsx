'use client'

import React, { useState, useRef, useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { TextStyle } from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import CodeBlock from '@tiptap/extension-code-block'
import Color from '@tiptap/extension-color'

import {
  FaBold,
  FaItalic,
  FaList,
  FaListOl,
  FaImage,
  FaLink,
  FaQuoteRight,
  FaCode,
  FaUndo,
  FaRedo,
  FaSave,
  FaTrash,
  FaHeading,
  FaUnderline,
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

  // Main Editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      Image,
      Link.configure({ openOnClick: true }),
      TextStyle,
      Color,
      Placeholder.configure({ placeholder: 'Start writing your blog...' }),
      Underline,
      CodeBlock,
    ],
    content: initialHTML || '<p>Hello, start your blog here…</p>',
    onUpdate: ({ editor }) => setJsonContent(editor.getJSON()),
    immediatelyRender: false,
  })

  // Preview Editor (read-only)
  const previewEditor = useEditor({
    editable: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      Image,
      Link.configure({ openOnClick: true }),
      TextStyle,
      Color,
      Underline,
      CodeBlock,
    ],
    content: initialHTML || '<p></p>',
    immediatelyRender: false,
  })

  // Sync preview with main editor
  useEffect(() => {
    if (!editor || !previewEditor) return
    const updatePreview = () => previewEditor.commands.setContent(editor.getHTML())
    editor.on('update', updatePreview)
    return () => {
      editor.off('update', updatePreview)
    }
  }, [editor, previewEditor])

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
    if (url) editor.chain().focus().setImage({ src: url }).run()
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

      {/* Editor & Preview */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Editor */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">
            <input
              placeholder="Post title..."
              className="w-full text-3xl font-bold outline-none mb-2 placeholder-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Short description / summary..."
              className="w-full resize-none text-sm text-gray-700 placeholder-gray-400 outline-none mb-3 h-16"
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
              {([1, 2, 3, 4, 5, 6] as const).map((lvl) => (
                <ToolbarButton
                  key={lvl}
                  active={editor.isActive('heading', { level: lvl })}
                  onClick={() => editor.chain().focus().toggleHeading({ level: lvl }).run()}
                  title={`H${lvl}`}
                >
                  <FaHeading />
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
            <div className="border-2 border-gray-200 rounded-lg p-4 min-h-[360px] prose max-w-full">
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
                <FaSave className="inline mr-2" /> {saving ? 'Saving...' : 'Save post'}
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
        </div>

        {/* Preview */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow p-4 sticky top-6">
            <h3 className="font-semibold text-lg mb-2">Live Preview</h3>
            <div className="prose max-w-none overflow-auto p-3 border rounded-md min-h-[360px]">
              <EditorContent editor={previewEditor} />
            </div>
          </div>
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
