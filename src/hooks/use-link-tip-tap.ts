import type { LinkHandlerProps } from "@/components/tip-tap/link";
import React from "react";

export const useLinkHandler = (props: LinkHandlerProps) => {
  const { editor, onSetLink, onLinkActive } = props;
  const [url, setUrl] = React.useState<string>("");

  React.useEffect(() => {
    if (!editor) return;

    // Get URL immediately on mount
    const { href } = editor.getAttributes("link");

    if (editor.isActive("link") && !url) {
      setUrl(href || "");
      onLinkActive?.();
    }
  }, [editor, onLinkActive, url]);

  React.useEffect(() => {
    if (!editor) return;

    const updateLinkState = () => {
      const { href } = editor.getAttributes("link");
      setUrl(href || "");

      if (editor.isActive("link") && !url) {
        onLinkActive?.();
      }
    };

    editor.on("selectionUpdate", updateLinkState);
    return () => {
      editor.off("selectionUpdate", updateLinkState);
    };
  }, [editor, onLinkActive, url]);

  const setLink = React.useCallback(() => {
    if (!url || !editor) return;

    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to);

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .insertContent({
        type: "text",
        text: text || url,
        marks: [{ type: "link", attrs: { href: url } }],
      })
      .run();

    onSetLink?.();
  }, [editor, onSetLink, url]);

  const removeLink = React.useCallback(() => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .unsetMark("link", { extendEmptyMarkRange: true })
      .setMeta("preventAutolink", true)
      .run();
    setUrl("");
  }, [editor]);

  return {
    url,
    setUrl,
    setLink,
    removeLink,
    isActive: editor?.isActive("link") || false,
  };
};
