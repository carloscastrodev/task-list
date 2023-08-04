import {
  QueryHook,
  QueryRendererErrorEmptyComponent,
  QueryRendererRenderComponent,
} from '@/types/hooks';
import { EmptyState } from '@/ui/components/EmptyState';
import EmptyStateMessage from '@/ui/components/EmptyState/EmptyStateMessage';
import { Skeleton } from '@/ui/components/Loader';
import React from 'react';

interface QueryRendererProps<TData, TQueryProps> {
  useQueryHook: QueryHook<TData, TQueryProps>;
  hookProps?: TQueryProps;
  renderComponent: QueryRendererRenderComponent<TData>;
  errorComponent?: QueryRendererErrorEmptyComponent;
  loaderComponent?: React.FC<void>;
}

const DefaultQueryRendererErrorComponent = () => (
  <EmptyState.Root>
    <EmptyStateMessage text="There was an error fetching that." />
  </EmptyState.Root>
);

function QueryRenderer<TData, TQueryProps>({
  useQueryHook,
  hookProps,
  renderComponent,
  loaderComponent = Skeleton,
  errorComponent = DefaultQueryRendererErrorComponent,
}: QueryRendererProps<TData, TQueryProps>) {
  const { data, isLoading, isError, errorMessage, refetch, queryKey } =
    useQueryHook(hookProps);

  const showErrorComponent = !isLoading && isError;

  const showDefaultComponent = data && !isLoading && !isError;

  return (
    <>
      {isLoading && loaderComponent()}
      {showDefaultComponent && renderComponent({ data, queryKey, refetch })}
      {showErrorComponent && errorComponent({ message: errorMessage, refetch })}
    </>
  );
}

export default QueryRenderer;
