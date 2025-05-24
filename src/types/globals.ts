import { Table } from '@tanstack/react-table';
import { SetStateAction } from 'react';

export type OptionalAll<T> = {
  [P in keyof T]?: T[P];
};

export type PrettifyType<T> = {
  [K in keyof T]: T[K] extends object ? PrettifyType<T[K]> : T[K];
} & unknown;

export interface FilterSearchParams {
  _offsetFrom?: string;
  _offsetTo: string;
  _idFile?: string;
  _status?: string;
  _startEffectiveDate?: string;
  _endEffectiveDate?: string;
  _startApprovedDate?: string;
  _endApprovedDate?: string;
  _startCreatedDate?: string;
  _endCreatedDate?: string;
  _minAmount?: string;
  _maxAmount?: string;
  _costCenter?: string;
  _branchCode?: string;
  _channelCode?: string;
  _transactionType?: string;
  _q?: string;
}
export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  setSearch: React.Dispatch<SetStateAction<string>>;
  searchParams?: FilterSearchParams;
  id?: string;
  isPending?: boolean;
}

export interface StateSearchParam {
  limit: number;
  page: number;
  _offset?: string;
  _offsetFrom?: string;
  _offsetTo: string;
}
