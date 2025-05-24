import { DefaultOptionSelectDropDown } from '@/types/globals';
import { createOptionYears } from './utils';

export const brinetStatusOption: DefaultOptionSelectDropDown[] = [
  {
    label: 'On Progress',
    value: '1',
  },
  {
    label: 'Valid',
    value: '2',
  },
  {
    label: 'Invalid',
    value: '-2',
  },
];

export const optionMonths: DefaultOptionSelectDropDown[] = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

export const optionYears = createOptionYears({ fromYear: 2015 });

export const optionsFlagGLProtect: DefaultOptionSelectDropDown[] = [
  { label: 'C - Rekening hanya untuk transaksi kredit', value: 'C' },
  { label: 'D - Rekening hanya untuk transaksi debit', value: 'D' },
  { label: 'B - Rekening bisa transaksi kredit & debit', value: 'B' },
  { label: 'P - Tidak dapat bertransaksi', value: 'P' },
];

export const glProtectFlagDesc: {
  [key: string]: string;
} = {
  C: 'Rekening hanya untuk transaksi kredit',
  D: 'Rekening hanya untuk transaksi debit',
  B: 'Rekening bisa transaksi kredit & debit',
  P: 'Tidak dapat bertransaksi',
};
