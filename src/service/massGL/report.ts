import { axiosApiMCRGLCasa } from '@/lib/axios';

import {
  RequestBodyBatchMassCreditGLCasa,
  RequestDetailBatchMassGL,
  RequestReportApprovalMassGL,
  ResponesGetReportMassCreditGLCasa,
  ResponseGetDetailBatchMassGL,
  ResponseGetPreBatchMassGL,
  ResponseGetReportMonitoringBatch,
  ResponseGetUploadFileGLCasa,
} from '@/schema/MassCreditGLCasa/report';
import {
  FilterSearchParams,
  LevelUserDefault,
  RequestBodyUploadFile,
  RequestPreBatch,
} from '@/types/globals';
import { AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';

export const getReportMassKreditGLCasa = async ({
  searchParams,
}: {
  searchParams: FilterSearchParams;
}) => {
  const session = await getSession();
  const requestBody: RequestBodyBatchMassCreditGLCasa = {
    searchKey: searchParams._q || '',
    amount: [Number(searchParams._minAmount || '0'), Number(searchParams._maxAmount || '0')],
    effectiveDate: [
      searchParams._startEffectiveDate || null,
      searchParams._endEffectiveDate || null,
    ],
    createdDate: [searchParams._startCreatedDate || null, searchParams._endCreatedDate || null],
    approvedDate: [searchParams._startApprovedDate || null, searchParams._endApprovedDate || null],
    status: searchParams._status?.length
      ? searchParams._status.split(',').map((d) => Number(d))
      : [],

    channelCode: searchParams._channelCode?.length ? searchParams._channelCode.split(',') : [],
    branchCode: searchParams._branchCode?.length ? searchParams._branchCode.split(',') : [],
    isGetAll: false,
    transactionType: searchParams._transactionType?.length
      ? searchParams._transactionType.split(',')
      : [],
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

  const { data } = await axiosApiMCRGLCasa.post<
    ResponesGetReportMassCreditGLCasa,
    AxiosResponse<ResponesGetReportMassCreditGLCasa, RequestBodyBatchMassCreditGLCasa>,
    RequestBodyBatchMassCreditGLCasa
  >('/batches/all', requestBody);

  return data;
};

export const getListUploadFileGLCasa = async ({
  request = {
    searchKey: '',
    isUsed: 2,
    costCenter: '',
    branchCode: 0,
  },
}: {
  request?: RequestBodyUploadFile;
}) => {
  const session = await getSession();

  const requestBody = { ...request };

  if (!session?.user.IsProductOwner && session?.user.LevelUser !== '6') {
    requestBody['costCenter'] = session?.user.CostCenter || '';
  }

  const { data } = await axiosApiMCRGLCasa.post<
    ResponseGetUploadFileGLCasa,
    AxiosResponse<ResponseGetUploadFileGLCasa, RequestBodyUploadFile>,
    RequestBodyUploadFile
  >('/list', requestBody);

  return data;
};

export const getDetailSumaryBatchGLCasa = async ({
  payload,
}: {
  payload: { batchNumber: string };
}) => {
  const searchParams = new URLSearchParams(payload).toString();
  const { data } = await axiosApiMCRGLCasa.get<ResponseGetReportMonitoringBatch>(
    `/report/monitoringBatch?${searchParams}`,
  );

  return data;
};

export const getReportApprovalMassGL = async ({
  searchParams,
  level,
}: {
  level: LevelUserDefault;
  searchParams?: FilterSearchParams;
}) => {
  const session = await getSession();

  const requestBody: RequestReportApprovalMassGL = {
    personalNumber: Number(session?.user.PersonalNumber || 0),
    role: level,
    searchKey: searchParams?._q || '',
    amount: [Number(searchParams?._minAmount || '0'), Number(searchParams?._maxAmount || '0')],
    effectiveDate: [
      searchParams?._startEffectiveDate || null,
      searchParams?._endEffectiveDate || null,
    ],

    channelCode: searchParams?._channelCode?.length ? searchParams?._channelCode.split(',') : [],
    branchCode: searchParams?._branchCode?.length ? searchParams?._branchCode.split(',') : [],
    isGetAll: false,
    transactionType: searchParams?._transactionType?.length
      ? searchParams?._transactionType.split(',')
      : [],

    pagination: {
      limit: Number(searchParams?._limit),
      page: Number(searchParams?._page),
      pageSize: 0,
    },
  };

  const { data } = await axiosApiMCRGLCasa.post<
    ResponesGetReportMassCreditGLCasa,
    AxiosResponse<ResponesGetReportMassCreditGLCasa, RequestReportApprovalMassGL>,
    RequestReportApprovalMassGL
  >('/report/approval/list', requestBody);

  return data;
};

export const getReportDetailMassKreditGLCasa = async ({
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

  const { data } = await axiosApiMCRGLCasa.post<
    ResponseGetDetailBatchMassGL,
    AxiosResponse<ResponseGetDetailBatchMassGL, RequestDetailBatchMassGL>,
    RequestDetailBatchMassGL
  >('/batches/detail', requestBody);

  return data;
};

export const getDetailPreBatchMassGL = async ({
  batchNumber,
  searchParams,
}: {
  batchNumber: number;
  searchParams: FilterSearchParams;
}) => {
  const requestBody: RequestPreBatch = {
    searchKey: searchParams._q || '',
    amount: [Number(searchParams._minAmount || '0'), Number(searchParams._maxAmount || '0')],

    status: searchParams._status?.length ? searchParams._status.split(',') : [],
    fidPreBatch: batchNumber,
    isGetAll: false,
    pagination: {
      page: Number(searchParams._page),
      pageSize: 0,
      limit: Number(searchParams._limit),
    },
  };

  const { data } = await axiosApiMCRGLCasa.post<
    ResponseGetPreBatchMassGL,
    AxiosResponse<ResponseGetPreBatchMassGL, RequestPreBatch>,
    RequestPreBatch
  >('/preBatches/detail', requestBody);

  return data;
};
