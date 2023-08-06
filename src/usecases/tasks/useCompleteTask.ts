import { completeTask } from '@/services/tasks';
import { MutateHook } from '@/types/hooks';
import { ServiceError } from '@/types/services';
import { Task, TaskList, TaskStatus } from '@/types/task';
import { useFeedbackDialog } from '@/ui/components/Dialog/FeedbackDialog/useFeedbackDialog';
import { mutateTaskInTaskList } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCompleteTask: MutateHook<Task> = (queryKey) => {
  const queryClient = useQueryClient();
  const { showFeedback } = useFeedbackDialog();

  const taskList: TaskList = queryClient.getQueryData(queryKey) ?? [];

  const setQueryData = () => {
    queryClient.setQueryData(queryKey, [...taskList]);
  };

  const fullyCompleteTask = (task: Task) => {
    if (task.subtasks.length) {
      task.subtasks.forEach(fullyCompleteTask);
    }

    const doneTask: Task = {
      ...task,
      doneAt: new Date().toISOString(),
      status: TaskStatus.DONE,
    };

    mutateTaskInTaskList(taskList, doneTask);

    return doneTask;
  };

  const { mutate, isLoading, isError } = useMutation<
    Task,
    ServiceError,
    Task,
    void
  >(
    async (task) => {
      fullyCompleteTask(task);

      setQueryData();

      return await completeTask(task.id);
    },
    {
      onSuccess: (completeTask) => {
        fullyCompleteTask(completeTask);

        setQueryData();
      },
      onError: (error, task) => {
        showFeedback(error.response?.data?.message);

        mutateTaskInTaskList(taskList, task);
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
        ? "Couldn't add a new task to list. Reload the page and try again."
        : undefined,
  };
};
