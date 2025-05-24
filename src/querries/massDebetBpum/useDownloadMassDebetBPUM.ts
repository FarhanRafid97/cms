import {
  handleDownloadFileMassDebetBPUM,
  handlerDownloadReportBatchMassDebetBPUM,
  handlerDownloadReportPreBatchMassDebetBPUM,
} from '@/service/massDebetBpum/download';
import { FilterSearchParams } from '@/types/globals';
import { useMutation } from '@tanstack/react-query';

export const useDownloadFileMassDebetBPUM = () => {
  return useMutation({
    mutationFn: async ({ fileName }: { fileName: string }) =>
      handleDownloadFileMassDebetBPUM({ fileName }),
  });
};

export const useDownloadBatchReportMassDebetBPUM = () => {
  return useMutation({
    mutationFn: async ({
      batchNumber,
      searchParams,
    }: {
      batchNumber: number;
      searchParams: FilterSearchParams;
    }) => handlerDownloadReportBatchMassDebetBPUM({ batchNumber, searchParams }),
  });
};

export const useDownloadReportPreBatchMassDebetBPUM = () => {
  return useMutation({
    mutationFn: async ({
      batchNumber,
      searchParams,
    }: {
      batchNumber: number;
      searchParams: FilterSearchParams;
    }) => handlerDownloadReportPreBatchMassDebetBPUM({ batchNumber, searchParams }),
  });
};
