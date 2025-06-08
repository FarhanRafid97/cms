'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Palette } from 'lucide-react';
import { useCallback, useState } from 'react';

interface ColorValue {
  hex: string;
}

const predefinedColors = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#10b981',
  '#14b8a6',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
  '#64748b',
];

export default function ColorPicker({
  handleColorChange,
}: {
  // eslint-disable-next-line no-unused-vars
  handleColorChange: (color: string) => void;
}) {
  const [color, setColor] = useState<ColorValue>({
    hex: '',
  });

  const updateColor = useCallback((newColor: ColorValue) => {
    setColor(newColor);
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full h-12 justify-start gap-3">
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
            <div className="grid grid-cols-6 gap-2">
              {predefinedColors.map((presetColor) => (
                <button
                  key={presetColor}
                  type="button"
                  className="w-8 h-8 rounded border border-border hover:scale-110 transition-transform"
                  style={{ backgroundColor: presetColor }}
                  onClick={() => updateColor({ hex: presetColor })}
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
                  handleColorChange(hex);
                }
              }}
              placeholder="#000000"
              className="font-mono"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
