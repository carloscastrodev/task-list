import { QueryKey } from '@tanstack/react-query';

export type QueryHook<TData, TProps> = (props: TProps) => {
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  data?: TData;
  errorMessage?: string;
};

export type MutateHook<TData> = (stateQueryKey: QueryKey) => {
  mutate: (data: TData) => void;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
};
