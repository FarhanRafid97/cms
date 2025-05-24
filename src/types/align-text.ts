import { type Editor } from "@tiptap/react";

import type { ButtonProps } from "@/types/tip-tap";

export type TextAlign = "left" | "center" | "right" | "justify";

export interface TextAlignButtonProps extends ButtonProps {
  editor?: Editor | null;

  align: TextAlign;

  text?: string;

  hideWhenUnavailable?: boolean;
}
