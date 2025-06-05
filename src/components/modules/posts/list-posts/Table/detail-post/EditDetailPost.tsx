'use client';

import { EditorToolbar } from '@/components/tip-tap/editor-toolbar';
import Link from '@/components/tip-tap/extension/link-extension';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUpdatePostDetail } from '@/querries/posts/post';
import { CompletePost, PostDetail } from '@/schema/posts/post';
import { useGetCloudinary } from '@/store/cloudinary';
import { CloudinaryUploadResponse } from '@/types/cloudinary';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useMeasure } from '@uidotdev/usehooks';
import axios from 'axios';
import { Loader2, Save, Undo } from 'lucide-react';
import { motion } from 'motion/react';
import type React from 'react';
import { SetStateAction, useRef, useState } from 'react';
import { toast } from 'sonner';
import ImageResize from 'tiptap-extension-resize-image';

export function Editor({
  row,
  detaiil_content,
  setEdit,
}: {
  row: CompletePost;
  detaiil_content: PostDetail;
  setEdit: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [ref] = useMeasure();
  const [isUploading, setIsUploading] = useState(false);
  const { cloudinary: cloudinarySign } = useGetCloudinary();

  const { mutateAsync: updatePostDetail, isPending } = useUpdatePostDetail();
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
    content: detaiil_content.content,
    immediatelyRender: false,
    autofocus: true,

    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.',
        class: 'prose prose-sm  focus:outline-none max-w-full p-1',
      },
      handleKeyDown: (view, event) => {
        // Handle Tab key to create indentation
        if (event.key === 'Tab' && !event.shiftKey) {
          event.preventDefault();
          // Insert tab character or spaces
          const { dispatch, state } = view;
          const { tr } = state;
          const tabChar = '\t'; // or '    ' for 4 spaces
          dispatch(tr.insertText(tabChar));
          return true;
        }
        return false;
      },
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length || !editor) return;
    if (!cloudinarySign) return;
    setIsUploading(true);

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('file', file);
    formData.append('api_key', `${cloudinarySign?.apiKey || ''}`);
    formData.append('timestamp', cloudinarySign.timestamp.toString());
    formData.append('signature', cloudinarySign.signature);
    formData.append('folder', 'my-first-folder');
    // formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260"); // You can manipulate image here

    try {
      const url = `https://api.cloudinary.com/v1_1/${cloudinarySign.cloudName}/auto/upload`;

      const { data } = await axios.post<CloudinaryUploadResponse>(url, formData, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      editor.chain().focus().setImage({ src: data.secure_url }).run();
      setIsUploading(false);
    } catch (error) {
      toast.error('Upload failed. Please try again.');
      setIsUploading(false);
    }
  };

  const refEditor = useRef<HTMLDivElement>(null);
  if (!editor) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="relative flex flex-col w-full h-full max-h-[90vh] gap-4 p-4 overflow-hidden"
    >
      <div className="flex justify-between gap-2">
        <h1 className="text-2xl font-bold capitalize underline">{row.title}</h1>
        <div className="flex gap-2">
          {!isPending && (
            <Button
              disabled={isPending}
              variant="outline"
              className="gap-2"
              onClick={() => {
                setEdit(false);
              }}
            >
              <Undo size={14} />
              Cancel
            </Button>
          )}

          <Button
            disabled={isPending}
            className="gap-2"
            onClick={() => {
              if (row.id) {
                updatePostDetail({
                  payload: {
                    postId: row.id || '',
                    content: editor.getHTML() || '',
                    detail_post_id: detaiil_content.id || '',
                  },
                });
                setEdit(false);
              }
            }}
          >
            <Save size={14} /> Save
          </Button>
        </div>
      </div>

      <div className="flex-grow h-[75vh]">
        <ScrollArea className="h-full rounded-lg border">
          <div className="p-4">
            <EditorContent ref={refEditor} editor={editor} className="min-h-full" />
          </div>
        </ScrollArea>
      </div>

      <div className="fixed -bottom-2 left-1/2 transform -translate-x-1/2 z-50">
        {!isPending ? (
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
        ) : (
          <div className="flex justify-center items-center h-full p-4">
            <div className="flex gap-2 items-center  border bg-background p-2 rounded-lg">
              <Loader2 className="animate-spin" />
              <span>Saving...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
