import { updatePriorities } from '@/services/tasks';
import { MutateHook } from '@/types/hooks';
import { ServiceError } from '@/types/services';
import { TaskList } from '@/types/task';
import { useFeedbackDialog } from '@/ui/components/Dialog/FeedbackDialog/useFeedbackDialog';
import { updateTasksPriority } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ReorderTaskData {
  taskIndex: number;
  destinationIndex: number;
}

type TaskIdToPriorityMap = Record<string, number>;

export const useReorderTasks: MutateHook<ReorderTaskData> = (queryKey) => {
  const queryClient = useQueryClient();
  const { showFeedback } = useFeedbackDialog();

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
    void,
    ServiceError,
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

      await updatePriorities(taskPriorityMap);
    },
    {
      onError: (error, { taskIndex, destinationIndex }) => {
        showFeedback(error.response?.data?.message);
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
