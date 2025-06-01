'use client';

import type React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useRef, useState } from 'react';
import ImageResize from 'tiptap-extension-resize-image';
import { EditorToolbar } from './editor-toolbar';
import Link from './extension/link-extension';
import { useClickAway } from '@uidotdev/usehooks';
import { Scan } from 'lucide-react';

export function Editor() {
  const [isUploading, setIsUploading] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsActive(false);
  });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsActive(false);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

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

  return (
    <div className="relative w-full h-full py-4">
      <div className="w-full py-4 flex justify-between px-8">
        <motion.button
          onClick={() => {
            setIsActive(true);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.85 }}
          className="w-fit"
        >
          <Scan />
        </motion.button>
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999999] bg-black/40"
          />
        )}
      </AnimatePresence>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isActive && (
          <div className="fixed p-6 inset-0 z-[99999999] flex justify-center items-center">
            <motion.div
              className="w-full h-full relative bg-white flex flex-col"
              ref={ref}
              initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.9 }}
              animate={{
                opacity: 1,
                filter: 'blur(0px)',
                scale: 1,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              exit={{
                opacity: 0,
                filter: 'blur(4px)',
                scale: 0.9,
                transition: { duration: 0.2, ease: 'easeIn' },
              }}
              style={{ borderRadius: 12 }}
              layoutId="editor-container"
            >
              {/* Editor Content - Scrollable */}
              <div className="flex-1 overflow-auto flex justify-center">
                <div className="w-3/4 py-8">
                  <motion.div layoutId="editor-content">
                    <EditorContent ref={refEditor} editor={editor} />
                  </motion.div>
                </div>
              </div>

              {/* Toolbar - Fixed at bottom of modal */}
              <div className="relative p-4 border-t bg-white">
                <div className="flex justify-center">
                  <motion.div layoutId="editor-toolbar">
                    <EditorToolbar
                      editor={editor}
                      onImageUpload={handleImageUpload}
                      isUploading={isUploading}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Collapsed State */}
      {!isActive && (
        <motion.div className="w-full flex flex-col" layoutId="editor-container">
          <motion.div layoutId="editor-content" className="w-2/4 mb-4">
            <EditorContent ref={refEditor} editor={editor} />
          </motion.div>

          <motion.div layoutId="editor-toolbar" className="w-full flex justify-center">
            <EditorToolbar
              editor={editor}
              onImageUpload={handleImageUpload}
              isUploading={isUploading}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
