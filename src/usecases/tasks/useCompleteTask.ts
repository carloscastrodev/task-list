import { MutateHook } from '@/types/hooks';
import { Task, TaskList, TaskStatus } from '@/types/task';
import { mutateTaskInTaskList } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCompleteTask: MutateHook<Task> = (queryKey) => {
  const queryClient = useQueryClient();

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

  const { mutate, isLoading, isError } = useMutation<Task, unknown, Task, void>(
    async (task) => {
      const doneTask = fullyCompleteTask(task);

      setQueryData();

      //const task = actuallySendTaskToBackend()

      return doneTask;
    },
    {
      onSuccess: (completeTask) => {
        fullyCompleteTask(completeTask);

        setQueryData();
      },
      onError: (_, task) => {
        // report error to user
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
