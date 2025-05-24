import {
  getListFilterBranchCode,
  getListFilterCostCenterMCR,
  getListParamStatusCodeMassCredit,
} from '@/service/massCredit/filter';
import { DefaultOptionSelectDropDown } from '@/types/globals';
import { useQuery } from '@tanstack/react-query';

export const useGetOptionBranchCode = () => {
  return useQuery({
    queryKey: ['BRANCH_CODE_FILTER_MASS_KREDIT'],
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      const response = await getListFilterBranchCode();

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
export const useGetOptionCostCenterMCR = ({ enabled = true }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['COST_CENTER_FILTER_MASS_KREDIT'],
    staleTime: 5000,
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      const response = await getListFilterCostCenterMCR();

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
export const useGetOptionStatusOptionMassCredit = () => {
  return useQuery({
    queryKey: ['STATUS_FILTER_MASS_KREDIT'],
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      const response = await getListParamStatusCodeMassCredit();

      const optionForParamChannel: DefaultOptionSelectDropDown[] = response.data.map(
        (branchCode) => {
          return {
            label: branchCode.statusDesc,
            value: branchCode.status + '',
          };
        },
      );

      return optionForParamChannel;
    },
  });
};
