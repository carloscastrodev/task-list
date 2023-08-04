import { QueryKey } from '@tanstack/react-query';

export type QueryHook<TData, TProps> = (props?: TProps) => {
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  data?: TData;
  errorMessage?: string;
  queryKey: QueryKey;
};

export type MutateHook<TData> = (stateQueryKey: QueryKey) => {
  mutate: (data: TData) => void;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
};

export type QueryRendererRenderComponent<TData> = React.FC<{
  data: TData;
  queryKey: QueryKey;
  refetch: () => void;
}>;

export type QueryRendererErrorEmptyComponent = React.FC<{
  message?: string;
  refetch: () => void;
}>;
