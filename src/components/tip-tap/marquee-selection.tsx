'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Editor } from '@tiptap/react';

interface SelectionBox {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface MarqueeSelectionProps {
  children: React.ReactNode;
  editor: Editor | null;
}

export function MarqueeSelection({ children, editor }: MarqueeSelectionProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(0);
  const isMarqueeSelectionRef = useRef<boolean>(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click

    startTimeRef.current = Date.now();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    setIsSelecting(true);
    setSelectionBox({
      startX,
      startY,
      endX: startX,
      endY: startY,
    });

    isMarqueeSelectionRef.current = false;
  }, []);

  const getTextNodesInRange = useCallback((startY: number, endY: number) => {
    if (!containerRef.current) return [];

    const editorElement = containerRef.current.querySelector('.ProseMirror');
    if (!editorElement) return [];

    const textNodes: { node: Text; element: Element; rect: DOMRect }[] = [];
    const walker = document.createTreeWalker(editorElement, NodeFilter.SHOW_TEXT, null, false);

    let node;
    while ((node = walker.nextNode())) {
      const textNode = node as Text;
      if (textNode.textContent?.trim()) {
        const range = document.createRange();
        range.selectNodeContents(textNode);

        const rects = range.getClientRects();
        for (let i = 0; i < rects.length; i++) {
          const rect = rects[i];
          const containerRect = containerRef.current!.getBoundingClientRect();
          const relativeTop = rect.top - containerRect.top;
          const relativeBottom = rect.bottom - containerRect.top;

          // Check if this text rect intersects with our selection range
          if (relativeBottom >= Math.min(startY, endY) && relativeTop <= Math.max(startY, endY)) {
            textNodes.push({
              node: textNode,
              element: textNode.parentElement || editorElement,
              rect: rect,
            });
          }
        }
      }
    }

    return textNodes;
  }, []);

  const createNativeSelection = useCallback(
    (startY: number, endY: number, startX: number, endX: number) => {
      if (!containerRef.current || !editor) return;

      const editorElement = containerRef.current.querySelector('.ProseMirror');
      if (!editorElement) return;

      try {
        const containerRect = containerRef.current.getBoundingClientRect();
        const minY = Math.min(startY, endY);
        const maxY = Math.max(startY, endY);
        const minX = Math.min(startX, endX);
        const maxX = Math.max(startX, endX);

        // Find start and end positions using native browser selection
        let startPos = null;
        let endPos = null;

        // Create temporary selections to find the right positions
        const selection = window.getSelection();
        if (!selection) return;

        // Find start position
        const startPoint =
          document.caretPositionFromPoint?.(containerRect.left + minX, containerRect.top + minY) ||
          document.caretRangeFromPoint?.(containerRect.left + minX, containerRect.top + minY);

        // Find end position
        const endPoint =
          document.caretPositionFromPoint?.(containerRect.left + maxX, containerRect.top + maxY) ||
          document.caretRangeFromPoint?.(containerRect.left + maxX, containerRect.top + maxY);

        if (startPoint && endPoint) {
          // Convert to TipTap positions
          const startTipTapPos = editor.view.posAtDOM(
            startPoint.offsetNode || startPoint.startContainer,
            startPoint.offset || startPoint.startOffset,
          );
          const endTipTapPos = editor.view.posAtDOM(
            endPoint.offsetNode || endPoint.endContainer,
            endPoint.offset || endPoint.endOffset,
          );

          if (startTipTapPos >= 0 && endTipTapPos >= 0) {
            const from = Math.min(startTipTapPos, endTipTapPos);
            const to = Math.max(startTipTapPos, endTipTapPos);

            if (from !== to) {
              editor.commands.setTextSelection({ from, to });
            }
          }
        }
      } catch (error) {
        console.log('Selection error:', error);
      }
    },
    [editor],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isSelecting || !selectionBox || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const endX = e.clientX - rect.left;
      const endY = e.clientY - rect.top;

      // Check if we've moved enough to constitute a drag (threshold of 3px for more responsive selection)
      const dragDistance = Math.sqrt(
        Math.pow(endX - selectionBox.startX, 2) + Math.pow(endY - selectionBox.startY, 2),
      );

      if (dragDistance < 3) return;

      isMarqueeSelectionRef.current = true;

      setSelectionBox((prev) => (prev ? { ...prev, endX, endY } : null));

      // Create native-like text selection
      createNativeSelection(selectionBox.startY, endY, selectionBox.startX, endX);

      // Get text nodes for visual highlighting
      const textNodesInRange = getTextNodesInRange(selectionBox.startY, endY);
      const elementsToHighlight = textNodesInRange.map(({ element }) => element);

      // Remove duplicates
      const uniqueElements = Array.from(new Set(elementsToHighlight));
      setSelectedElements(uniqueElements);
    },
    [isSelecting, selectionBox, createNativeSelection, getTextNodesInRange],
  );

  const handleMouseUp = useCallback(() => {
    const selectionDuration = Date.now() - startTimeRef.current;

    // If it was a very quick click (less than 150ms) and small movement, treat as normal click
    if (selectionDuration < 150 && selectionBox) {
      const dragDistance = Math.sqrt(
        Math.pow(selectionBox.endX - selectionBox.startX, 2) +
          Math.pow(selectionBox.endY - selectionBox.startY, 2),
      );

      if (dragDistance < 3) {
        // This was just a click, not a drag
        setIsSelecting(false);
        setSelectionBox(null);
        setSelectedElements([]);
        isMarqueeSelectionRef.current = false;
        return;
      }
    }

    setIsSelecting(false);
    setSelectionBox(null);

    // Keep the selection visible briefly
    setTimeout(() => {
      setSelectedElements([]);
      isMarqueeSelectionRef.current = false;
    }, 100);
  }, [selectionBox]);

  useEffect(() => {
    if (isSelecting) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isSelecting, handleMouseMove, handleMouseUp]);

  // Apply selection styling to selected elements
  useEffect(() => {
    const previouslySelected = containerRef.current?.querySelectorAll('.marquee-selected');
    previouslySelected?.forEach((el) => el.classList.remove('marquee-selected'));

    selectedElements.forEach((element) => {
      element.classList.add('marquee-selected');
    });

    return () => {
      const selected = containerRef.current?.querySelectorAll('.marquee-selected');
      selected?.forEach((el) => el.classList.remove('marquee-selected'));
    };
  }, [selectedElements]);

  const getSelectionBoxStyle = () => {
    if (!selectionBox) return {};

    const { startX, startY, endX, endY } = selectionBox;
    const left = Math.min(startX, endX);
    const top = Math.min(startY, endY);
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);

    // Only show the selection box if we've dragged enough
    const dragDistance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

    if (dragDistance < 3) return { display: 'none' };

    return {
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseDown={handleMouseDown}
      style={{
        userSelect: isMarqueeSelectionRef.current ? 'none' : 'auto',
      }}
    >
      {children}

      <AnimatePresence>
        {isSelecting && selectionBox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute pointer-events-none z-50 bg-blue-200/20 border border-blue-400/50 rounded-sm"
            style={getSelectionBoxStyle()}
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        .marquee-selected {
          background-color: rgba(59, 130, 246, 0.15) !important;
        }

        .ProseMirror .ProseMirror-selectednode {
          background-color: rgba(59, 130, 246, 0.2) !important;
        }

        /* Enhanced selection appearance */
        .ProseMirror ::selection {
          background-color: rgba(59, 130, 246, 0.3) !important;
        }

        .ProseMirror ::-moz-selection {
          background-color: rgba(59, 130, 246, 0.3) !important;
        }

        /* Ensure proper text selection behavior */
        .ProseMirror {
          position: relative !important;
          user-select: text !important;
        }

        /* Smooth selection transitions */
        .ProseMirror * {
          transition: background-color 0.1s ease !important;
        }

        /* Maintain container positioning */
        .relative {
          position: relative !important;
          overflow: visible !important;
        }

        /* Improve text node selection visibility */
        .ProseMirror p,
        .ProseMirror h1,
        .ProseMirror h2,
        .ProseMirror h3,
        .ProseMirror h4,
        .ProseMirror h5,
        .ProseMirror h6,
        .ProseMirror li,
        .ProseMirror span,
        .ProseMirror div {
          position: relative;
        }
      `}</style>
    </div>
  );
}
