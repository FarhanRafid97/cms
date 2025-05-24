import {
  canSetTextAlign,
  checkTextAlignExtension,
  isTextAlignActive,
  isTextAlignButtonDisabled,
  setTextAlign,
  shouldShowTextAlignButton,
  textAlignIcons,
  textAlignLabels,
  textAlignShortcutKeys,
} from '@/lib/algin-text';
import type { TextAlign } from '@/types/align-text';
import { type Editor } from '@tiptap/react';
import React from 'react';

export function useTextAlign(
  editor: Editor | null,
  align: TextAlign,
  disabled: boolean = false,
  hideWhenUnavailable: boolean = false,
) {
  const alignAvailable = React.useMemo(() => checkTextAlignExtension(editor), [editor]);

  const canAlign = React.useMemo(
    () => canSetTextAlign(editor, align, alignAvailable),
    [editor, align, alignAvailable],
  );

  const isDisabled = isTextAlignButtonDisabled(editor, alignAvailable, canAlign, disabled);
  const isActive = isTextAlignActive(editor, align);

  const handleAlignment = React.useCallback(() => {
    if (!alignAvailable || !editor || isDisabled) return false;
    return setTextAlign(editor, align);
  }, [alignAvailable, editor, isDisabled, align]);

  const shouldShow = React.useMemo(
    () => shouldShowTextAlignButton(editor, canAlign, hideWhenUnavailable),
    [editor, canAlign, hideWhenUnavailable],
  );

  const Icon = textAlignIcons[align];
  const shortcutKey = textAlignShortcutKeys[align];
  const label = textAlignLabels[align];

  return {
    alignAvailable,
    canAlign,
    isDisabled,
    isActive,
    handleAlignment,
    shouldShow,
    Icon,
    shortcutKey,
    label,
  };
}
