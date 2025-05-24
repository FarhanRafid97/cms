import { useCallback, useState } from 'react';
import copy from 'copy-to-clipboard';

type CopiedValue = string | null;

// eslint-disable-next-line no-unused-vars
type CopyFn = (text: string) => Promise<boolean>;

type CopyReturn = [CopiedValue, CopyFn];

/**
 * A hook that allows to copy text to clipboard.
 * @returns {CopyReturn} An array of two elements:
 * 1. The current value of the copied text.
 * 2. A function to copy text to clipboard.
 */
export default function useCopyToClipboard(): CopyReturn {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copyFn: CopyFn = useCallback(async (text) => {
    try {
      copy(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      setCopiedText(null);
      return false;
    }
  }, []);

  return [copiedText, copyFn];
}
