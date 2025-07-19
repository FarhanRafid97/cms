import * as React from 'react';

import { useTiptapEditor } from '@/hooks/use-tip-tap';

import { Button } from '@/components/ui/button';
import { useTextAlign } from '@/hooks/use-text-align';
import type { TextAlignButtonProps } from '@/types/align-text';

export const TextAlignButton = React.forwardRef<HTMLButtonElement, TextAlignButtonProps>(
  (
    {
      editor: providedEditor,
      align,
      text,
      hideWhenUnavailable = false,
      className = '',
      disabled = false,
      onClick,
      children,
      ...buttonProps
    },
    ref,
  ) => {
    const editor = useTiptapEditor(providedEditor);

    const { isDisabled, handleAlignment, shouldShow, Icon, isActive, shortcutKey, label } =
      useTextAlign(editor, align, disabled, hideWhenUnavailable);

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);

        if (!e.defaultPrevented && !disabled) {
          handleAlignment();
        }
      },
      [onClick, disabled, handleAlignment],
    );

    if (!shouldShow || !editor || !editor.isEditable) {
      return null;
    }

    return (
      <Button
        className={className.trim()}
        disabled={isDisabled}
        tooltip={label}
        size="icon"
        variant={isActive ? 'secondary' : 'ghost'}
        shortcutKeys={shortcutKey}
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children || (
          <>
            <Icon size={16} className="tiptap-button-icon" />
            {text && <span className="tiptap-button-text">{text}</span>}
          </>
        )}
      </Button>
    );
  },
);

TextAlignButton.displayName = 'TextAlignButton';

export default TextAlignButton;
