import { taskListMock } from '@/mocks/tasks';
import { QueryHook } from '@/types/hooks';
import { TaskList } from '@/types/task';
import { useQuery } from '@tanstack/react-query';

interface useTaskListProps {
  filter?: string;
}

export const useTaskList: QueryHook<TaskList, useTaskListProps> = () => {
  const queryKey = ['todo-list'];

  const { data, isLoading, isError, refetch } = useQuery(queryKey, async () => {
    return new Promise<TaskList>((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve(taskListMock) : reject(null);
      }, 3000);
    });
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
