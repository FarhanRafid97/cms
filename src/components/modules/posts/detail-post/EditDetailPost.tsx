'use client';

import { EditorToolbar } from '@/components/tip-tap/editor-toolbar';
import Link from '@/components/tip-tap/extension/link-extension';
import { Button } from '@/components/ui/button';
import { useUpdatePostDetail } from '@/querries/posts/post';
import { CompleteDetailPost } from '@/schema/posts/post';
import { useGetCloudinary } from '@/store/cloudinary';
import { CloudinaryUploadResponse } from '@/types/cloudinary';
import { TypeLevelHeader } from '@/types/globals';
import { Color } from '@tiptap/extension-color';
import Heading from '@tiptap/extension-heading';
import { Highlight } from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { EditorContent, mergeAttributes, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import { Loader2, Save } from 'lucide-react';
import type React from 'react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import ImageResize from 'tiptap-extension-resize-image';
import { match } from 'ts-pattern';

export function Editor({
  id,
  complete_detail_post,
}: {
  id: string;
  complete_detail_post: CompleteDetailPost;
}) {
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
        placeholder: 'Tuilis Sesuatu…',
      }),
      TextStyle,
      Highlight.configure({ multicolor: true }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }).extend({
        renderHTML({ HTMLAttributes, node }) {
          const hasLevel = this.options.levels.includes(node.attrs.level);

          const level: TypeLevelHeader = hasLevel ? node.attrs.level : this.options.levels[0];
          const uuid = crypto.randomUUID();

          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              id: uuid,
            }),
            0,
          ];
        },
      }),
      TextAlign.configure({
        types: ['paragraph', 'heading'],
      }),
      Link.configure({ openOnClick: false }),
    ],
    content: complete_detail_post.content,
    immediatelyRender: false,
    autofocus: true,

    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.',
        class: 'tiptap prose prose-sm sm:prose l focus:outline-none max-w-full',
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
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const handleSave = async () => {
    const new_content = editor.getHTML();
    const is_no_changes = match(new_content.replace(/\s*id="[^"]*"/g, ''))
      .with(complete_detail_post.content?.replace(/\s*id="[^"]*"/g, '') || '', () => {
        toast.info('Tidak Ada Perubahan');
        return true;
      })
      .otherwise(() => {
        return false;
      });

    if (is_no_changes) {
      return;
    }
    if (id) {
      await updatePostDetail({
        payload: {
          postId: id || '',
          content: editor.getHTML() || '',
          detail_post_id: complete_detail_post.id || '',
        },
      });
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen relative">
        {/* Toolbar */}
        <div className="w-full grid grid-cols-6 bg-background border-b sticky top-16 z-10 self-start p-1 border-t">
          <div className="flex items-center space-x-1 w-fit col-span-4 md:col-span-5 flex-wrap">
            <EditorToolbar
              editor={editor}
              onImageUpload={handleImageUpload}
              isUploading={isUploading}
            />
          </div>
          <div className="flex start-center gap-1 col-span-2 md:col-span-1 justify-end">
            <Button
              size="sm"
              onClick={() => {
                handleSave();
              }}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-1" />
              )}
              Simpan
            </Button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 p-4">
          <div className="max-w-4xl mx-auto">
            <EditorContent
              ref={refEditor}
              editor={editor}
              className="min-h-[600px] focus-within:outline-none prose prose-sm sm:prose lg:prose-lg max-w-none "
            />
          </div>
        </div>
      </div>
      {(isPending || isUploading) && (
        <div className="border-t bg-muted/40 px-6 py-3 fixed inset-0 grid place-items-center place-content-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{isUploading ? 'Uploading image...' : 'Saving changes...'}</span>
          </div>
        </div>
      )}
    </>
  );
}
