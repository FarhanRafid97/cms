import type { TextAlign } from "@/types/align-text";
import { type ChainedCommands, type Editor } from "@tiptap/react";

import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

export const textAlignIcons = {
  left: AlignLeft,
  center: AlignCenter,
  right: AlignRight,
  justify: AlignJustify,
};

export const textAlignShortcutKeys: Partial<Record<TextAlign, string>> = {
  left: "Ctrl-Shift-l",
  center: "Ctrl-Shift-e",
  right: "Ctrl-Shift-r",
  justify: "Ctrl-Shift-j",
};

export const textAlignLabels: Record<TextAlign, string> = {
  left: "Align left",
  center: "Align center",
  right: "Align right",
  justify: "Align justify",
};

export function hasSetTextAlign(
  commands: ChainedCommands
): commands is ChainedCommands & {
  setTextAlign: (align: TextAlign) => ChainedCommands;
} {
  return "setTextAlign" in commands;
}

export function checkTextAlignExtension(editor: Editor | null): boolean {
  if (!editor) return false;

  const hasExtension = editor.extensionManager.extensions.some(
    (extension) => extension.name === "textAlign"
  );

  if (!hasExtension) {
    console.warn(
      "TextAlign extension is not available. " +
        "Make sure it is included in your editor configuration."
    );
  }

  return hasExtension;
}

export function canSetTextAlign(
  editor: Editor | null,
  align: TextAlign,
  alignAvailable: boolean
): boolean {
  if (!editor || !alignAvailable) return false;

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    console.log(
      "editor.can().setTextAlign(align);",
      editor.can().setTextAlign(align)
    );
    return editor.can().setTextAlign(align);
  } catch {
    return false;
  }
}

export function isTextAlignActive(
  editor: Editor | null,
  align: TextAlign
): boolean {
  if (!editor) return false;
  return editor.isActive({ textAlign: align });
}

export function setTextAlign(editor: Editor | null, align: TextAlign): boolean {
  if (!editor) return false;

  const chain = editor.chain().focus();
  if (hasSetTextAlign(chain)) {
    return chain.setTextAlign(align).run();
  }
  return false;
}

export function isTextAlignButtonDisabled(
  editor: Editor | null,
  alignAvailable: boolean,
  canAlign: boolean,
  userDisabled: boolean = false
): boolean {
  if (!editor || !alignAvailable || userDisabled || !canAlign) return true;

  return false;
}

export function shouldShowTextAlignButton(
  editor: Editor | null,
  canAlign: boolean,
  hideWhenUnavailable: boolean
): boolean {
  if (!editor?.isEditable) return false;
  if (hideWhenUnavailable && !canAlign) return false;
  return true;
}
