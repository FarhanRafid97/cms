import { axiosMcrExisting } from '@/lib/axios';
import { IBaseResponseApi } from '@/lib/types';
import {
  TInsertUserConfiguration,
  TResponseGetUserConfiguration,
  TUserConfiguration,
  UpdateUserConfiguration,
} from '@/schema/parameter/userConfiguration';
import { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';
import { toast } from 'sonner';

const ENDPOINT = '/UserConfiguration';

export const getListUserConfiguration = async () => {
  try {
    const { data } = await axiosMcrExisting.get(ENDPOINT);

    const dataResponse = data as TResponseGetUserConfiguration;

    return dataResponse.result;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.message ?? 'Failed Get Data');
    } else {
      toast.error('Failed Get Data');
    }
    return [];
  }
};

export const createUserConfiguration = async ({
  payload,
}: {
  payload: TInsertUserConfiguration;
}) => {
  const { data } = await axiosMcrExisting.post<IBaseResponseApi & { result: TUserConfiguration }>(
    ENDPOINT,
    payload,
  );

  return data;
};

export const updateUserConfiguration = async ({
  payload,
}: {
  payload: UpdateUserConfiguration;
}) => {
  const { data } = await axiosMcrExisting.put<IBaseResponseApi & { result: TUserConfiguration }>(
    ENDPOINT,
    payload,
  );

  return data;
};

export const deleteUserConfiguration = async ({ id }: { id: number }) => {
  const { data } = await axiosMcrExisting.delete<IBaseResponseApi>(ENDPOINT, {
    data: { id },
  });

  return data;
};

export const getUserConfigurationByCostCenter = async () => {
  try {
    const session = await getSession();
    const { data } = await axiosMcrExisting.post<TResponseGetUserConfiguration>(
      `UserConfigurationByCC`,
      { costCenter: session?.user.CostCenter },
    );

    return data.result;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.ResponseMessage || 'Failed Get Data');
      return [];
    }
    toast.error('Failed Get Data');

    return [];
  }
};

export const getSignerOrChecker = async ({
  isSigner,
  limitTransaction,
  isBpum,
}: {
  isBpum?: boolean;
  isSigner: boolean;
  limitTransaction: number;
}) => {
  const session = await getSession();

  const requestBody: { [key: string]: string | number } = {
    transactionLimitIDR: limitTransaction,
    costCenter: session?.user.CostCenter || '',
  };

  if (isBpum) {
    const selectedEndpointBPUM = isSigner
      ? '/UserConfigurationByTrxLimitCCSignerInitiatorBPUM'
      : '/UserConfigurationByTrxLimitCheckerInitiatorBPUM';

    const { data: dataUserBPUM } = await axiosMcrExisting.post<TResponseGetUserConfiguration>(
      selectedEndpointBPUM,
      requestBody,
    );

    return dataUserBPUM;
  }
  const selectedEndpoint = isSigner
    ? '/UserConfigurationByTrxLimitCCSignerInitiator'
    : '/UserConfigurationByTrxLimitCCCheckerInitiator';

  const { data: dataUser } = await axiosMcrExisting.post<TResponseGetUserConfiguration>(
    `${selectedEndpoint}`,
    requestBody,
  );

  return dataUser;
};
