'use client';

import { useState, useCallback } from 'react';
import type { Editor } from '@tiptap/react';

export function useMarqueeSelection(editor: Editor | null) {
  const [selectedElements, setSelectedElements] = useState<Element[]>([]);

  const handleSelectionChange = useCallback((elements: Element[]) => {
    setSelectedElements(elements);
  }, []);

  const deleteSelectedElements = useCallback(() => {
    if (!editor || selectedElements.length === 0) return;

    // For each selected element, find its position in the editor and delete it
    selectedElements.forEach((element) => {
      // Get the DOM node position in the editor
      const pos = editor.view.posAtDOM(element, 0);
      if (pos >= 0) {
        const node = editor.state.doc.nodeAt(pos);
        if (node) {
          editor
            .chain()
            .focus()
            .deleteRange({ from: pos, to: pos + node.nodeSize })
            .run();
        }
      }
    });

    setSelectedElements([]);
  }, [editor, selectedElements]);

  const formatSelectedElements = useCallback(
    (format: 'bold' | 'italic' | 'strike' | 'highlight') => {
      if (!editor || selectedElements.length === 0) return;

      selectedElements.forEach((element) => {
        const pos = editor.view.posAtDOM(element, 0);
        if (pos >= 0) {
          const node = editor.state.doc.nodeAt(pos);
          if (node) {
            const from = pos;
            const to = pos + node.nodeSize;

            switch (format) {
              case 'bold':
                editor.chain().focus().setTextSelection({ from, to }).toggleBold().run();
                break;
              case 'italic':
                editor.chain().focus().setTextSelection({ from, to }).toggleItalic().run();
                break;
              case 'strike':
                editor.chain().focus().setTextSelection({ from, to }).toggleStrike().run();
                break;
              case 'highlight':
                editor.chain().focus().setTextSelection({ from, to }).toggleHighlight().run();
                break;
            }
          }
        }
      });
    },
    [editor, selectedElements],
  );

  const clearSelection = useCallback(() => {
    setSelectedElements([]);
  }, []);

  return {
    selectedElements,
    handleSelectionChange,
    deleteSelectedElements,
    formatSelectedElements,
    clearSelection,
    hasSelection: selectedElements.length > 0,
  };
}
