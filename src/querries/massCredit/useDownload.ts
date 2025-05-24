import {
  handlerDownloadFileMassCredit,
  handlerDownloadReportBatchMassCredit,
  handlerDownloadReportPreBatchMassCredit,
} from '@/service/massCredit/download';
import { FilterSearchParams } from '@/types/globals';
import { useMutation } from '@tanstack/react-query';

export const useDownloadFileMassCredit = () => {
  return useMutation({
    mutationFn: ({ fileName }: { fileName: string }) => {
      return handlerDownloadFileMassCredit({ fileName });
    },
  });
};

export const useDownloadReportBatchMassCredit = () => {
  return useMutation({
    mutationFn: ({
      batchNumber,
      searchParams,
    }: {
      batchNumber: number;
      searchParams: FilterSearchParams;
    }) => {
      return handlerDownloadReportBatchMassCredit({ batchNumber, searchParams });
    },
  });
};
export const useDownloadReportPreBatchMassCredit = () => {
  return useMutation({
    mutationFn: ({
      batchNumber,
      searchParams,
    }: {
      batchNumber: number;
      searchParams: FilterSearchParams;
    }) => {
      return handlerDownloadReportPreBatchMassCredit({ batchNumber, searchParams });
    },
  });
};
