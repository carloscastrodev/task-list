import { listTasks } from '@/services/tasks';
import { QueryHook } from '@/types/hooks';
import { TaskList } from '@/types/task';
import { useQuery } from '@tanstack/react-query';

interface useTaskListProps {
  filter?: string;
}

export const useTaskList: QueryHook<TaskList, useTaskListProps> = () => {
  const queryKey = ['todo-list'];

  const { data, isLoading, isError, refetch } = useQuery(queryKey, async () => {
    return await listTasks();
  });

  return {
    data,
    isLoading,
    isError,
    errorMessage:
      isError && !isLoading ? "Couldn't load the task list." : undefined,
    refetch: () => refetch(),
    queryKey,
  };
};
