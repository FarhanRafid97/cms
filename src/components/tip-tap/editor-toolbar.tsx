'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TransparencyGridIcon } from '@radix-ui/react-icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { isTextAlignActive, textAlignIcons } from '@/lib/algin-text';
import { cn } from '@/lib/utils';
import type { Editor } from '@tiptap/react';
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImageIcon,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Loader2,
  Minus,
  Palette,
  Quote,
  Strikethrough,
  X,
  type LucideIcon,
} from 'lucide-react';
import React, { useState } from 'react';
import { match } from 'ts-pattern';
import TextAlignButton from './text-align';

interface EditorToolbarProps {
  editor: Editor;
  // eslint-disable-next-line no-unused-vars
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
}

const heading_list = [
  { label: 'heading', level: 1 as const },
  { label: 'heading', level: 2 as const },
  { label: 'heading', level: 3 as const },
];
const mapping_icon_heading: { [key: string]: LucideIcon } = {
  'heading-1': Heading1,
  'heading-2': Heading2,
  'heading-3': Heading3,
};

export function EditorToolbar({ editor, onImageUpload, isUploading }: EditorToolbarProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [isLinkOpen, setIsLinkOpen] = useState(false);

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const insertLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl, target: '_blank' }).run();
      setLinkUrl('');
      setIsLinkOpen(false);
    }
  };

  const colors = [
    '#000000',
    '#343A40',
    '#495057',
    '#6C757D',
    '#ADB5BD',
    '#E03131',
    '#C2255C',
    '#9C36B5',
    '#6741D9',
    '#3B5BDB',
    '#1971C2',
    '#0C8599',
    '#099268',
    '#2B8A3E',
    '#5C940D',
    '#E8590C',
    '#F08C00',
    '#FAB005',
    '#FFFFFF', // White
    'transparent', // Transparent
  ];

  return (
    <div className=" p-4  w-full">
      <div className="flex w-fit  rounded shadow border-lg gap-2 mx-auto bg-background border-[#dbdbdb] p-2">
        <TooltipProvider delayDuration={300}>
          {/* Text Formatting Group */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={cn(editor.isActive('bold') ? 'bg-accent' : '')}
                aria-label="Bold"
              >
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={cn(editor.isActive('italic') ? 'bg-accent' : '')}
                aria-label="Italic"
              >
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={cn(editor.isActive('strike') ? 'bg-accent' : '')}
                aria-label="Strikethrough"
              >
                <Strikethrough className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Strikethrough</TooltipContent>
          </Tooltip>
          <div className="p-0 py-1 ">
            <Separator orientation="vertical" className="mx-1 h-6 " />
          </div>
          {/* Headings */}
          {heading_list.map((datalist_heading) => {
            const currentHeading: 1 | 2 | 3 | 4 | 5 = datalist_heading.level;
            const IconHeading = mapping_icon_heading[`heading-${currentHeading}`] || Heading1;
            return (
              <Tooltip key={`heading-${currentHeading}`}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: currentHeading }).run();
                    }}
                    className={cn(
                      editor.isActive('heading', { level: currentHeading }) ? 'bg-accent' : '',
                    )}
                    aria-label={`Heading ${currentHeading}`}
                  >
                    <IconHeading className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Heading {currentHeading} </TooltipContent>
              </Tooltip>
            );
          })}

          {/* Lists */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={cn(editor.isActive('bulletList') ? 'bg-accent' : '')}
                aria-label="Bullet List"
              >
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={cn(editor.isActive('orderedList') ? 'bg-accent' : '')}
                aria-label="Ordered List"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Ordered List</TooltipContent>
          </Tooltip>

          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm">
                  {match(isTextAlignActive(editor, 'justify'))
                    .with(true, () => {
                      const Icon = textAlignIcons['justify'];
                      return <Icon />;
                    })
                    .otherwise(() => {
                      return match(isTextAlignActive(editor, 'right'))
                        .with(true, () => {
                          const Icon = textAlignIcons['right'];
                          return <Icon />;
                        })
                        .otherwise(() =>
                          match(isTextAlignActive(editor, 'center'))
                            .with(true, () => {
                              const Icon = textAlignIcons['center'];
                              return <Icon />;
                            })
                            .otherwise(() => {
                              const Icon = textAlignIcons['left'];
                              return <Icon />;
                            }),
                        );
                    })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-1 w-fit " isContentWidthAuto={false}>
                <div>
                  <TextAlignButton align="left" editor={editor} />
                  <TextAlignButton align="justify" editor={editor} />
                  <TextAlignButton align="center" editor={editor} />
                  <TextAlignButton align="right" editor={editor} />
                </div>
              </PopoverContent>
            </Popover>
          </div>
          {/* Highlight */}
          <Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" aria-label="Text Color">
                    <Palette className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>Text Color</TooltipContent>
            </Tooltip>
            <PopoverContent className="w-64 p-2" isContentWidthAuto={false}>
              <div className="grid grid-cols-6 gap-1">
                {colors.map((color) =>
                  color === 'transparent' ? (
                    <Button
                      key={color}
                      variant="ghost"
                      size="sm"
                      className="w-6 h-6 p-0 border hover:shadow cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => editor.chain().focus().setColor(color).run()}
                    >
                      <TransparencyGridIcon className="text-xl" fontSize={40} />
                    </Button>
                  ) : (
                    <Button
                      key={color}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 border hover:shadow cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => editor.chain().focus().setColor(color).run()}
                    />
                  ),
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 border border-dashed border-muted-foreground"
                  onClick={() => editor.chain().focus().unsetColor().run()}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" aria-label="Highlight">
                    <Highlighter className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>Highlight</TooltipContent>
            </Tooltip>
            <PopoverContent className="w-64 p-2" isContentWidthAuto={false}>
              <div className="grid grid-cols-6 gap-1">
                {colors.map((color) =>
                  color === 'transparent' ? (
                    <Button
                      key={color}
                      variant="ghost"
                      size="sm"
                      className="w-6 h-6 p-0 border hover:shadow cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
                    >
                      <TransparencyGridIcon width={40} />
                    </Button>
                  ) : (
                    <Button
                      key={color}
                      variant="ghost"
                      size="sm"
                      className="w-6 h-6 p-0 border hover:shadow cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
                    />
                  ),
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 border border-dashed border-muted-foreground"
                  onClick={() => editor.chain().focus().unsetHighlight().run()}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <div className="p-0 py-1 ">
            <Separator orientation="vertical" className="mx-1 h-6 " />
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={cn(editor.isActive('blockquote') ? 'bg-accent' : '')}
                aria-label="Quote"
              >
                <Quote className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Quote</TooltipContent>
          </Tooltip>

          {/* Link */}
          <Popover open={isLinkOpen} onOpenChange={setIsLinkOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(editor.isActive('link') ? 'bg-accent' : '')}
                    aria-label="Link"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>Link</TooltipContent>
            </Tooltip>
            <PopoverContent
              isContentWidthAuto={false}
              className="w-80 p-3"
              onOpenAutoFocus={() => {
                const previousUrl = editor.getAttributes('link').href;

                setLinkUrl(previousUrl);
              }}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="link-url" className="text-sm font-medium">
                  URL
                </label>
                <div className="flex gap-2">
                  <Input
                    id="link-url"
                    value={linkUrl}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        insertLink();
                      }
                    }}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="flex-1"
                  />
                  <Button size="sm" onClick={insertLink}>
                    Add
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Horizontal Rule */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                aria-label="Horizontal Rule"
              >
                <Minus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Horizontal Rule</TooltipContent>
          </Tooltip>

          {/* Image Upload */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={triggerImageUpload}
                disabled={isUploading}
                aria-label="Upload Image"
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ImageIcon className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Upload Image</TooltipContent>
          </Tooltip>

          <input
            type="file"
            ref={fileInputRef}
            onChange={onImageUpload}
            accept="image/*"
            className="hidden"
          />
        </TooltipProvider>
      </div>
    </div>
  );
}
