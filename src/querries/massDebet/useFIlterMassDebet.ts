import { getListFilterBranchCodeMDB, getListFilterCostCenterMDB } from '@/service/massDebet/Filter';
import { DefaultOptionSelectDropDown } from '@/types/globals';
import { useQuery } from '@tanstack/react-query';

export const useGetOptionBranchCodeMDB = () => {
  return useQuery({
    queryKey: ['BRANCH_CODE_FILTER_MASS_KREDIT'],
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      const response = await getListFilterBranchCodeMDB();

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
export const useGetOptionCostCenterMDB = ({ enabled = true }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['COST_CENTER_FILTER_MASS_KREDIT'],
    staleTime: 5000,
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      const response = await getListFilterCostCenterMDB();

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
