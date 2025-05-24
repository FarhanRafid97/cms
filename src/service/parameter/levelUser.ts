import { axiosMcrExisting } from '@/lib/axios';
import { TResponseGetLevelUser } from '@/schema/parameter/levelUser';
import { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';
import { toast } from 'sonner';

export const getListLevelUser = async () => {
  try {
    const { data } = await axiosMcrExisting.get<TResponseGetLevelUser>(`/ParamLevelUser`);

    return data.result;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.message ?? 'Failed Get Data');
    } else {
      toast.error('Failed Get Data');
    }
    return [];
  }
};

export const getLevelUserDropdown = async () => {
  const session = await getSession();

  let WS_URL_SERVICE = '/ParamLevelUserInitiator';
  if (session?.user.IsProductOwner) {
    WS_URL_SERVICE = '/ParamLevelUserProductOwner';
  } else if (session?.user.IsSEIDivision) {
    WS_URL_SERVICE = '/ParamLevelUserSeiDivisi';
  } else if (session?.user.LevelUser == '1') {
    WS_URL_SERVICE = '/ParamLevelUser';
  }
  const { data } = await axiosMcrExisting.get<TResponseGetLevelUser>(WS_URL_SERVICE);

  return data.result;
};
