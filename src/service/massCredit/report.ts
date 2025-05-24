import { axiosApiMassCreditV2 } from '@/lib/axios';
import { CHANNEL_CODE } from '@/lib/constant';

import {
  RequestReportApprovalMassCredit,
  ResponesGetReportMassCredit,
  ResponseGetDetailMassCreditReport,
  ResponseGetMassCreditPreBatch,
} from '@/schema/MassCredit/report';
import {
  RequestDetailBatchMassGL,
  ResponseGetReportMonitoringBatch,
} from '@/schema/MassCreditGLCasa/report';
import {
  FilterSearchParams,
  LevelUserDefault,
  RequestPreBatchMcrMdb,
  TypeRequestMcrMdb,
} from '@/types/globals';
import { AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';

export const getReportPengajuanMassCredit = async ({
  searchParams,
}: {
  searchParams: FilterSearchParams;
}) => {
  const session = await getSession();
  const requestBody: TypeRequestMcrMdb = {
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

    channelCode: CHANNEL_CODE,
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

  const { data } = await axiosApiMassCreditV2.post<
    ResponesGetReportMassCredit,
    AxiosResponse<ResponesGetReportMassCredit, TypeRequestMcrMdb>,
    TypeRequestMcrMdb
  >('/batches/all', requestBody);

  return data;
};

export const getReportDetailMassKredit = async ({
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

  const { data } = await axiosApiMassCreditV2.post<
    ResponseGetDetailMassCreditReport,
    AxiosResponse<ResponseGetDetailMassCreditReport, RequestDetailBatchMassGL>,
    RequestDetailBatchMassGL
  >('/batches/detail', requestBody);

  return data;
};

export const getDetailSumaryBatchMassKredit = async ({
  payload,
}: {
  payload: { batchNumber: string };
}) => {
  const searchParams = new URLSearchParams(payload).toString();
  const { data } = await axiosApiMassCreditV2.get<ResponseGetReportMonitoringBatch>(
    `/report/monitoringBatch?${searchParams}`,
  );

  return data;
};

export const getReportApprovalMassKredit = async ({
  level,
  searchParams,
}: {
  level: LevelUserDefault;
  searchParams: FilterSearchParams;
}) => {
  const session = await getSession();

  const requestBody: RequestReportApprovalMassCredit = {
    personalNumber: Number(session?.user.PersonalNumber || 0),
    role: level,
    channelCode: CHANNEL_CODE,
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

  const { data } = await axiosApiMassCreditV2.post<
    ResponesGetReportMassCredit,
    AxiosResponse<ResponesGetReportMassCredit, RequestReportApprovalMassCredit>,
    RequestReportApprovalMassCredit
  >('/report/approval/list', requestBody);

  return data;
};

export const getDetailPreBatchMassCredit = async ({
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

  const { data } = await axiosApiMassCreditV2.post<
    ResponseGetMassCreditPreBatch,
    AxiosResponse<ResponseGetMassCreditPreBatch, RequestPreBatchMcrMdb>,
    RequestPreBatchMcrMdb
  >('/batches/detailBefore', requestBody);

  return data;
};
