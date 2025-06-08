'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { predefinedColors } from '@/lib/options-default';
import { cn } from '@/lib/utils';
import { AlertCircle, Palette } from 'lucide-react';
import { useCallback, useState } from 'react';

interface ColorValue {
  hex: string;
}

export default function ColorPicker({
  handleColorChange,
  value = '',
  error,
}: {
  error?: string;
  // eslint-disable-next-line no-unused-vars
  handleColorChange: (color: string) => void;
  value?: string;
}) {
  const [color, setColor] = useState<ColorValue>({
    hex: value,
  });

  const updateColor = useCallback((newColor: ColorValue) => {
    setColor(newColor);
  }, []);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn('w-full h-12 justify-start gap-3', error ? 'border-destructive' : '')}
          >
            <div
              className="w-6 h-6 rounded border border-border"
              style={{ backgroundColor: color.hex }}
            />
            <span className="font-mono">{color.hex}</span>
            <Palette className="w-4 h-4 ml-auto" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <div className="space-y-4">
            {/* Color Preview */}
            <div
              className="w-full h-20 rounded-lg border border-border"
              style={{ backgroundColor: color.hex }}
            />
            <div className="space-y-2">
              <Label className="text-sm font-medium">Preset Colors</Label>
              <div className="grid grid-cols-8 gap-2">
                {predefinedColors.map((presetColor) => (
                  <button
                    key={presetColor}
                    type="button"
                    className="w-8 h-8 rounded border border-border hover:scale-110 transition-transform"
                    style={{ backgroundColor: presetColor }}
                    onClick={() => {
                      updateColor({ hex: presetColor });
                      handleColorChange(presetColor);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Hex Input */}
            <div className="space-y-2">
              <Label className="text-sm">Hex Color</Label>
              <Input
                value={color.hex}
                onChange={(e) => {
                  const hex = e.target.value;
                  if (/^#[0-9A-F]{6}$/i.test(hex)) {
                    updateColor({ hex });
                  }
                }}
                placeholder="#000000"
                className="font-mono"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>{' '}
      {error ? (
        <div className="flex items-center gap-2">
          <AlertCircle size={14} className="text-red-400" />
          <Label className="text-red-400">{error}</Label>
        </div>
      ) : null}
    </>
  );
}
