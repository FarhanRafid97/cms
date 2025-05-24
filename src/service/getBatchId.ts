import { axiosMcrExisting } from '@/lib/axios';
import { IBaseResponseApi } from '@/lib/types';

export const getBatchId = async ({ type = 'MCR' }: { type?: 'MDB' | 'MCR' }) => {
  const config = { url: '/GetBatch_MassDebet', sourceApplication: '/BrimassproMassCredit' };

  if (type === 'MCR') {
    config.url = 'GetBatch_MassCredit';
    config.sourceApplication = 'BrimassproMassCredit';
  }

  const { data } = await axiosMcrExisting.post<IBaseResponseApi & { result: string }>(config.url, {
    sourceApplication: config.sourceApplication,
  });

  return data;
};
