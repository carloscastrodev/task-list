import { MutateHook } from '@/types/hooks';
import { TaskList } from '@/types/task';
import { updateTasksPriority } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ReorderTaskData {
  taskIndex: number;
  destinationIndex: number;
}

type TaskIdToPriorityMap = Record<string, number>;

export const useReorderTasks: MutateHook<ReorderTaskData> = (queryKey) => {
  const queryClient = useQueryClient();

  const taskList: TaskList = queryClient.getQueryData(queryKey) ?? [];

  const reorderAndUpdatePriorities = ({
    taskIndex,
    destinationIndex,
  }: {
    taskIndex: number;
    destinationIndex: number;
  }) => {
    const [removed] = taskList.splice(taskIndex, 1);
    taskList.splice(destinationIndex, 0, removed);

    updateTasksPriority(taskList);
  };

  const setQueryData = () => {
    queryClient.setQueryData(queryKey, [...taskList]);
  };

  const { mutate, isLoading, isError } = useMutation<
    TaskIdToPriorityMap,
    unknown,
    ReorderTaskData,
    void
  >(
    async ({ taskIndex, destinationIndex }) => {
      reorderAndUpdatePriorities({ taskIndex, destinationIndex });

      setQueryData();

      const taskPriorityMap = taskList.reduce((acc, next) => {
        acc[next.id] = next.priority;
        return acc;
      }, {} as TaskIdToPriorityMap);

      //const task = actuallySendTaskToBackend()

      return taskPriorityMap;
    },
    {
      onError: (_, { taskIndex, destinationIndex }) => {
        // report error to user
        reorderAndUpdatePriorities({
          taskIndex: destinationIndex,
          destinationIndex: taskIndex,
        });
        setQueryData();
      },
    }
  );

  return {
    mutate,
    isLoading,
    isError,
    errorMessage:
      isError && !isLoading
        ? "Couldn't delete task. Reload the page and try again."
        : undefined,
  };
};
