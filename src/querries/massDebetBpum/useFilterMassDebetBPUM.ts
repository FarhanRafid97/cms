import {
  getListFilterCostCenterMassDebetBPUM,
  getListParamStatusCodeMassDebetBPUM,
  getListFilterBranchCodeMassDebetBPUM,
} from '@/service/massDebetBpum/filter';
import { DefaultOptionSelectDropDown } from '@/types/globals';
import { useQuery } from '@tanstack/react-query';

export const useGetOptionBranchCodeMassDebetBPUM = () => {
  return useQuery({
    queryKey: ['BRANCH_CODE_FILTER_MASS_KREDIT'],
    staleTime: 5000,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      const response = await getListFilterBranchCodeMassDebetBPUM();

      const optionForParamChannel: DefaultOptionSelectDropDown[] = response.data.branchCodes.map(
        (branchCode) => {
          return {
            label: branchCode,
            value: branchCode,
          };
        },
      );

      return optionForParamChannel;
    },
  });
};
export const useGetOptionCostCenterMassDebetBPUM = ({ enabled = true }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['COST_CENTER_FILTER_MASS_KREDIT'],
    staleTime: 5000,
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      const response = await getListFilterCostCenterMassDebetBPUM();

      const optionForParamChannel: DefaultOptionSelectDropDown[] = response.data.map(
        (branchCode) => {
          return {
            label: branchCode.costCenterDesc,
            value: branchCode.costCenter,
          };
        },
      );

      return optionForParamChannel;
    },
  });
};
export const useGetOptionStatusCodeMassDebetBPUM = () => {
  return useQuery({
    queryKey: ['STATUS_FILTER_MASS_KREDIT'],
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      const response = await getListParamStatusCodeMassDebetBPUM();

      const optionForParamChannel: DefaultOptionSelectDropDown[] = response.data.map(
        (branchCode) => {
          return {
            label: branchCode.statusDesc,
            value: `${branchCode.status}`,
          };
        },
      );

      return optionForParamChannel;
    },
  });
};
