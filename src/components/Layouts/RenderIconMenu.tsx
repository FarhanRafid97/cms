import {
  ICON_BPUM,
  ICON_MAINTENANCE_MENU,
  ICON_MAPPING,
  ICON_MASS_DEBET,
  ICON_MASS_GL,
  ICON_MASS_KREDIT,
  ICON_PARAMETER,
} from '@/lib/icon';
import { cn } from '@/lib/utils';
import { Package } from 'lucide-react';
import { FC } from 'react';
import { match } from 'ts-pattern';

interface RenderIconMenuProps {
  menuItem:
    | 'MassDebet'
    | 'MassDebetBPUM'
    | 'MassKredit'
    | 'MassGL'
    | 'Parameter'
    | 'Maintenance Menu'
    | 'Pengajuan'
    | 'Mapping'
    | 'Mass Debet'
    | 'Mass Debet GVP'
    | 'Mass Kredit'
    | 'Mass GL'
    | string;

  size?: number;
  className?: string;
}

const RenderIconMenu: FC<RenderIconMenuProps> = ({ menuItem, size = 20, className: c }) => {
  const strokeWidth = 2;
  const IconSelected = match(menuItem)
    .with('Mass Debet', 'MassDebet', () => ICON_MASS_DEBET)
    .with('Mass Debet GVP', 'MassDebetBPUM', () => ICON_BPUM)
    .with('Mass Kredit', 'MassKredit', () => ICON_MASS_KREDIT)
    .with('Mass GL', 'MassGL', () => ICON_MASS_GL)
    .with('Parameter', () => ICON_PARAMETER)
    .with('Maintenance Menu', () => ICON_MAINTENANCE_MENU)
    .with('Pengajuan', () => Package)
    .with('Mapping', () => ICON_MAPPING)
    .otherwise(() => null);

  if (!IconSelected) {
    return null;
  }

  return <IconSelected width={size} height={size} strokeWidth={strokeWidth} className={cn(c)} />;
};

export default RenderIconMenu;
