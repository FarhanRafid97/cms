import {
  handleDownloadFileMassDebet,
  handlerDownloadReportBatchMassDebet,
  handlerDownloadReportPreBatchMassDebet,
} from '@/service/massDebet/download';
import { FilterSearchParams } from '@/types/globals';
import { useMutation } from '@tanstack/react-query';

export const useDownloadFileMassDebet = () => {
  return useMutation({
    mutationFn: async ({ fileName }: { fileName: string }) =>
      handleDownloadFileMassDebet({ fileName }),
  });
};

export const useDownloadBatchReportMassDebet = () => {
  return useMutation({
    mutationFn: async ({
      batchNumber,
      searchParams,
    }: {
      batchNumber: number;
      searchParams: FilterSearchParams;
    }) => handlerDownloadReportBatchMassDebet({ batchNumber, searchParams }),
  });
};

export const useDownloadReportPreBatchMassDebet = () => {
  return useMutation({
    mutationFn: async ({
      batchNumber,
      searchParams,
    }: {
      batchNumber: number;
      searchParams: FilterSearchParams;
    }) => handlerDownloadReportPreBatchMassDebet({ batchNumber, searchParams }),
  });
};
