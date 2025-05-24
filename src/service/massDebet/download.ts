import { axiosApiMassDebetV2 } from '@/lib/axios';
import { RequestDetailBatchMassGL } from '@/schema/MassCreditGLCasa/report';
import { BaseApiResponseMCRGL, FilterSearchParams, RequestPreBatchMcrMdb } from '@/types/globals';
import { toast } from 'sonner';

export const handleDownloadFileMassDebet = async ({ fileName }: { fileName: string }) => {
  if (!fileName) {
    return;
  }
  try {
    const response = await axiosApiMassDebetV2.get(`/download?filename=${fileName}`, {
      responseType: 'blob',
    });
    const contentType = response.headers['content-type'];
    if (contentType && contentType.includes('application/json')) {
      const reader = new FileReader();
      reader.onload = () => {
        const errorData: BaseApiResponseMCRGL = JSON.parse(`${reader.result}`);

        toast.info(errorData.message);
      };
      reader.readAsText(response.data);
      return;
    }

    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    toast.error(`Failed Donwload file ${fileName}`);
  }
};

export const handlerDownloadReportBatchMassDebet = async ({
  searchParams,
  batchNumber,
}: {
  searchParams: FilterSearchParams;
  batchNumber: number;
}) => {
  if (!batchNumber) {
    toast.info('Batch Number Tidak ada');
    return;
  }

  const requestBody: RequestDetailBatchMassGL = {
    searchKey: searchParams._q || '',
    amount: [Number(searchParams._minAmount || '0'), Number(searchParams._maxAmount || '0')],
    status: searchParams._status?.length
      ? searchParams._status.split(',').map((d) => Number(d))
      : [],

    batchNumber,

    isGetAll: false,
    pagination: {
      page: Number(searchParams._page),
      pageSize: 0,
      limit: Number(searchParams._limit),
    },
  };

  try {
    const response = await axiosApiMassDebetV2.post('/batches/detail/download', requestBody, {
      responseType: 'blob',
    });

    const contentType = response.headers['content-type'];

    if (contentType && contentType.includes('application/json')) {
      const reader = new FileReader();
      reader.onload = () => {
        const errorData: BaseApiResponseMCRGL = JSON.parse(`${reader.result}`);
        toast.info(errorData.message);
      };
      reader.readAsText(response.data);
      return;
    }

    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `REPORT_BATCH_${batchNumber}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    toast.error(`Failed to download file for batch number ${batchNumber}`);
  }
};

export const handlerDownloadReportPreBatchMassDebet = async ({
  searchParams,
  batchNumber,
}: {
  searchParams: FilterSearchParams;
  batchNumber: number;
}) => {
  if (!batchNumber) {
    toast.info('Batch Number Tidak ada');
    return;
  }
  const requestBody: RequestPreBatchMcrMdb = {
    searchKey: searchParams._q || '',
    amount: [Number(searchParams._minAmount || '0'), Number(searchParams._maxAmount || '0')],

    status: searchParams._status?.length ? searchParams._status.split(',') : [],
    batchNumber: batchNumber,
    isGetAll: false,
    pagination: {
      page: Number(searchParams._page),
      pageSize: 0,
      limit: Number(searchParams._limit),
    },
  };

  try {
    const response = await axiosApiMassDebetV2.post('/batches/detailBefore/download', requestBody, {
      responseType: 'blob',
    });

    const contentType = response.headers['content-type'];

    if (contentType && contentType.includes('application/json')) {
      const reader = new FileReader();
      reader.onload = () => {
        const errorData: BaseApiResponseMCRGL = JSON.parse(`${reader.result}`);
        toast.info(errorData.message);
      };
      reader.readAsText(response.data);
      return;
    }

    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `REPORT_FILE_${batchNumber}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    toast.error(`Failed to download file for batch number ${batchNumber}`);
  }
};
