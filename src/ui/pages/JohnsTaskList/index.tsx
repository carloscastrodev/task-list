import { EmptyState } from '@/ui/components/EmptyState';
import QueryRenderer from '@/ui/components/QueryRenderer';
import { ReorderableTaskList } from '@/ui/components/Tasks/ReorderableTaskList';
import { useTaskList } from '@/usecases/tasks';
import { applyPossessiveCase } from '@/utils';

function JohnsTaskList() {
  return (
    <div className="h-full pt-4">
      <div className="relative flex h-full flex-col">
        <h1 className="mb-2 border-b-2 text-center text-xl font-bold md:text-2xl">
          {applyPossessiveCase('John')} Task List
        </h1>

        <QueryRenderer
          renderComponent={({ data, queryKey, refetch }) => (
            <ReorderableTaskList
              data={data}
              queryKey={queryKey}
              refetch={refetch}
            />
          )}
          useQueryHook={useTaskList}
          errorComponent={({ refetch }) => (
            <EmptyState.Root>
              <EmptyState.Icon />
              <EmptyState.Message text="There was an error fetching the tasks." />
              <EmptyState.CTA action={refetch} text="Retry" />
            </EmptyState.Root>
          )}
        />
      </div>
    </div>
  );
}

export default JohnsTaskList;
