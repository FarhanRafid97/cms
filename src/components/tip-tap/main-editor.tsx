'use client';

import type React from 'react';

import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useRef, useState } from 'react';
import ImageResize from 'tiptap-extension-resize-image';
import { EditorToolbar } from './editor-toolbar';
import Link from './extension/link-extension';

export function Editor() {
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Color,
      ImageResize,
      Placeholder.configure({
        placeholder: 'Type "/" for commands...',
      }),
      TextStyle,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ['paragraph', 'heading'],
      }),
      Link.configure({ openOnClick: false }),
    ],
    content: `
      <h1>Welcome to your Notion-like Editor</h1>
      <p>This is a Tiptap editor that looks like Notion. You can:</p>
      <ul>
        <li>Format text with the toolbar</li>
        <li>Upload images</li>
        <li>Create headings, lists, and more</li>
      </ul>
      <p>Try it out!</p>
    `,
    immediatelyRender: false,
    autofocus: true,

    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.',
        class: 'prose prose-sm sm:pros lg:prose-sm focus:outline-none max-w-full p-1',
      },
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length || !editor) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsUploading(true);

      // Option A: Base64 preview with FileReader
      const reader = new FileReader();
      reader.onload = function (onLoadEvent) {
        const base64 = onLoadEvent.target?.result as string;
        if (base64) {
          editor.chain().focus().setImage({ src: base64 }).run();
        }
      };
      reader.readAsDataURL(file); // trigger FileReader

      // Option B: Upload image to server and use its URL
      // const imageUrl = await uploadImage(formData);
      // if (imageUrl) {
      //   editor.chain().focus().setImage({ src: imageUrl }).run();
      // }
      setIsUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const refEditor = useRef<HTMLDivElement>(null);
  if (!editor) {
    return null;
  }
  console.log(editor.getJSON());
  return (
    <div className="relative h-full py-4">
      <div
        className="py-2 flex justify-center "
        onClick={() => {
          refEditor.current?.focus();
        }}
      >
        <div className="w-2/4 ">
          <EditorContent
            ref={refEditor}
            editor={editor}
            className="h-screen pb-[100px] overflow-auto pb focus:outline-none"
          />
        </div>
        <EditorToolbar
          editor={editor}
          onImageUpload={handleImageUpload}
          isUploading={isUploading}
        />
      </div>
    </div>
  );
}
