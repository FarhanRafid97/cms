'use client';

import { EditorToolbar } from '@/components/tip-tap/editor-toolbar';
import Link from '@/components/tip-tap/extension/link-extension';
import { PostDetail } from '@/schema/posts/post';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import type React from 'react';
import { SetStateAction, useRef, useState } from 'react';
import ImageResize from 'tiptap-extension-resize-image';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Save, Undo } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMeasure } from '@uidotdev/usehooks';

export function Editor({
  row,
  edit,
  setEdit,
}: {
  row: PostDetail;
  edit: boolean;
  setEdit: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [ref, bounds] = useMeasure();
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
    content: row.content,
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
    <div ref={ref} className="relative w-full h-full py-0 overflow-hidden">
      <div className="flex justify-end gap-2 mb-1">
        <Button
          className="gap-2"
          onClick={() => {
            setEdit(false);
          }}
        >
          {' '}
          <Undo size={14} />
          Cancel
        </Button>
        <Button className="gap-2">
          <Save size={14} /> Save
        </Button>
      </div>
      <div>
        <ScrollArea style={{ height: Number(bounds.height || 0) * 0.9 }}>
          <EditorContent ref={refEditor} editor={editor} />
        </ScrollArea>
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.1, duration: 0.3 }}
        >
          <EditorToolbar
            editor={editor}
            onImageUpload={handleImageUpload}
            isUploading={isUploading}
          />
        </motion.div>
      </div>
    </div>
  );
}
