import {
  handleDownloadFileMassGL,
  handlerDownloadReportBatchMassGL,
  handlerDownloadReportPreBatchMassGL,
} from '@/service/massGL/download';
import { FilterSearchParams } from '@/types/globals';
import { useMutation } from '@tanstack/react-query';

export const useDownloadFileMassGL = () => {
  return useMutation({
    mutationFn: ({ fileName }: { fileName: string }) => {
      return handleDownloadFileMassGL({ fileName });
    },
  });
};

export const useDownloadFileReportDetailMassGL = () => {
  return useMutation({
    mutationFn: ({
      batchNumber,
      searchParams,
    }: {
      batchNumber: number;
      searchParams: FilterSearchParams;
    }) => {
      return handlerDownloadReportBatchMassGL({ batchNumber, searchParams });
    },
  });
};
export const useDownloadFilePreBatchMassGL = () => {
  return useMutation({
    mutationFn: ({
      batchNumber,
      searchParams,
    }: {
      batchNumber: number;
      searchParams: FilterSearchParams;
    }) => {
      return handlerDownloadReportPreBatchMassGL({ batchNumber, searchParams });
    },
  });
};
