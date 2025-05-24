import { axiosApiMassDebetV2 } from '@/lib/axios';
import { CHANNEL_CODE } from '@/lib/constant';
import { RequestReportApprovalMassCredit } from '@/schema/MassCredit/report';
import {
  RequestDetailBatchMassGL,
  ResponseGetReportMonitoringBatch,
} from '@/schema/MassCreditGLCasa/report';
import {
  ResponesGetReportMassDebet,
  ResponseGetDetailMassDebetReport,
  ResponseGetMassDebetPreBatch,
} from '@/schema/MassDebet/report';
import {
  FilterSearchParams,
  LevelUserDefault,
  RequestApproval,
  RequestPreBatchMcrMdb,
  ResponseApproval,
  TypeRequestMcrMdb,
} from '@/types/globals';
import { AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';

export const getReportPengajuanMassDebet = async ({
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

  const { data } = await axiosApiMassDebetV2.post<
    ResponesGetReportMassDebet,
    AxiosResponse<ResponesGetReportMassDebet, TypeRequestMcrMdb>,
    TypeRequestMcrMdb
  >('/batches/all', requestBody);

  return data;
};

export const getReportDetailMassDebet = async ({
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

  const { data } = await axiosApiMassDebetV2.post<
    ResponseGetDetailMassDebetReport,
    AxiosResponse<ResponseGetDetailMassDebetReport, RequestDetailBatchMassGL>,
    RequestDetailBatchMassGL
  >('/batches/detail', requestBody);

  return data;
};

export const getDetailSumaryBatchMassDebet = async ({
  payload,
}: {
  payload: { batchNumber: string };
}) => {
  const searchParams = new URLSearchParams(payload).toString();
  const { data } = await axiosApiMassDebetV2.get<ResponseGetReportMonitoringBatch>(
    `/report/monitoringBatch?${searchParams}`,
  );

  return data;
};

export const getReportApprovalMassDebet = async ({
  searchParams,
  level,
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

  const { data } = await axiosApiMassDebetV2.post<
    ResponesGetReportMassDebet,
    AxiosResponse<ResponesGetReportMassDebet, RequestReportApprovalMassCredit>,
    RequestReportApprovalMassCredit
  >('/report/approval/list', requestBody);

  return data;
};

export const handlerApprovalMassDebet = async ({ payload }: { payload: RequestApproval }) => {
  const { data } = await axiosApiMassDebetV2.post<
    ResponseApproval,
    AxiosResponse<ResponseApproval, RequestApproval>,
    RequestApproval
  >('/batches/approve', payload);

  return data;
};

export const getDetailPreBatchMassDebet = async ({
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

  const { data } = await axiosApiMassDebetV2.post<
    ResponseGetMassDebetPreBatch,
    AxiosResponse<ResponseGetMassDebetPreBatch, RequestPreBatchMcrMdb>,
    RequestPreBatchMcrMdb
  >('/batches/detailBefore', requestBody);

  return data;
};
