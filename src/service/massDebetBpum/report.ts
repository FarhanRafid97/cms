import { axiosApiMassDebetBPUMV2 } from '@/lib/axios';
import { RequestReportApprovalMassCredit } from '@/schema/MassCredit/report';
import {
  RequestDetailBatchMassGL,
  ResponseGetReportMonitoringBatch,
} from '@/schema/MassCreditGLCasa/report';

import {
  ResponesGetReportMassDebetBPUM,
  ResponseGetDetailMassDebetBPUM,
  ResponseGetMassDebetBPUMPreBatch,
  ResponseGetPreBatchMassDebetBPUM,
} from '@/schema/MassDebetBPUM/report';
import {
  BaseApiResponseMCRGL,
  FilterSearchParams,
  LevelUserDefault,
  OptionalAll,
  RequestPreBatchMcrMdb,
  TypeRequestMcrMdb,
} from '@/types/globals';
import { AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';
import { toast } from 'sonner';

export const getReportPengajuanMassDebetBPUM = async ({
  searchParams,
}: {
  searchParams: FilterSearchParams;
}) => {
  const session = await getSession();
  const requestBody: TypeRequestMcrMdb = {
    searchKey: searchParams._q || '',
    amount: [Number(searchParams._minAmount || '0'), Number(searchParams._maxAmount || '0')],

    status: searchParams._status?.length
      ? searchParams._status.split(',').map((d) => Number(d))
      : [],

    branchCode: searchParams._branchCode?.length ? searchParams._branchCode.split(',') : [],
    isGetAll: false,
    pagination: {
      page: Number(searchParams._page),
      pageSize: 0,
      limit: Number(searchParams._limit),
    },
  };
  if (session?.user.IsProductOwner) {
    requestBody.costCenter = searchParams._costCenter?.length
      ? searchParams._costCenter.split(',')
      : [];
  } else {
    requestBody['costCenter'] = [session?.user.CostCenter || ''];
  }

  const { data } = await axiosApiMassDebetBPUMV2.post<
    ResponesGetReportMassDebetBPUM,
    AxiosResponse<ResponesGetReportMassDebetBPUM, TypeRequestMcrMdb>,
    TypeRequestMcrMdb
  >('/batches/all', requestBody);

  return data;
};

export const getReportApprovalMassDebetBPUM = async ({
  searchParams,
  level,
}: {
  level: LevelUserDefault;
  searchParams: FilterSearchParams;
}) => {
  const session = await getSession();

  const requestBody: OptionalAll<RequestReportApprovalMassCredit> = {
    personalNumber: Number(session?.user.PersonalNumber || 0),
    role: level,

    searchKey: searchParams._q || '',
    amount: [Number(searchParams._minAmount || '0'), Number(searchParams._maxAmount || '0')],
    effectiveDate: [
      searchParams._startEffectiveDate || null,
      searchParams._endEffectiveDate || null,
    ],
    costCenter: searchParams._costCenter?.length ? searchParams._costCenter.split(',') : [],
    branchCode: searchParams._branchCode?.length ? searchParams._branchCode.split(',') : [],
    isGetAll: false,
    pagination: {
      page: Number(searchParams._page),
      pageSize: 0,
      limit: Number(searchParams._limit),
    },
  };

  const { data } = await axiosApiMassDebetBPUMV2.post<
    ResponesGetReportMassDebetBPUM,
    AxiosResponse<ResponesGetReportMassDebetBPUM, OptionalAll<RequestReportApprovalMassCredit>>,
    OptionalAll<RequestReportApprovalMassCredit>
  >('/report/approval/list', requestBody);

  return data;
};

export const getDetailMassDebetBPUM = async ({
  batchNumber,
  searchParams,
}: {
  batchNumber: number;
  searchParams: FilterSearchParams;
}) => {
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

  const { data } = await axiosApiMassDebetBPUMV2.post<
    ResponseGetDetailMassDebetBPUM,
    AxiosResponse<ResponseGetDetailMassDebetBPUM, RequestPreBatchMcrMdb>,
    RequestPreBatchMcrMdb
  >('/batches/detail', requestBody);

  return data;
};

export const getPreBatchMassDebetBPUM = async ({
  batchNumber,
  searchParams,
}: {
  batchNumber: number;
  searchParams: FilterSearchParams;
}) => {
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

  const { data } = await axiosApiMassDebetBPUMV2.post<
    ResponseGetPreBatchMassDebetBPUM,
    AxiosResponse<ResponseGetPreBatchMassDebetBPUM, RequestPreBatchMcrMdb>,
    RequestPreBatchMcrMdb
  >('/batches/detailBefore', requestBody);

  return data;
};

export const getSummaryBatchMassDebetBPUM = async ({
  payload,
}: {
  payload: { batchNumber: string };
}) => {
  const searchParams = new URLSearchParams(payload).toString();
  const { data } = await axiosApiMassDebetBPUMV2.get<ResponseGetReportMonitoringBatch>(
    `/report/monitoringBatch?${searchParams}`,
  );

  return data;
};

export const handleDownloadFileMassDebetBPUM = async ({ fileName }: { fileName: string }) => {
  if (!fileName) {
    return;
  }
  try {
    const response = await axiosApiMassDebetBPUMV2.get(`/download?filename=${fileName}`, {
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

export const getDetailPreBatchMassDebetBPUM = async ({
  batchNumber,
  searchParams,
}: {
  batchNumber: number;
  searchParams: FilterSearchParams;
}) => {
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

  const { data } = await axiosApiMassDebetBPUMV2.post<
    ResponseGetMassDebetBPUMPreBatch,
    AxiosResponse<ResponseGetMassDebetBPUMPreBatch, RequestPreBatchMcrMdb>,
    RequestPreBatchMcrMdb
  >('/batches/detailBefore', requestBody);

  return data;
};

export const getReportDetailMassDebetBPUM = async ({
  batchNumber,
  searchParams,
}: {
  batchNumber: number;
  searchParams: FilterSearchParams;
}) => {
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

  const { data } = await axiosApiMassDebetBPUMV2.post<
    ResponseGetDetailMassDebetBPUM,
    AxiosResponse<ResponseGetDetailMassDebetBPUM, RequestDetailBatchMassGL>,
    RequestDetailBatchMassGL
  >('/batches/detail', requestBody);

  return data;
};
