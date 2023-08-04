import { MutateHook } from '@/types/hooks';
import { Task, TaskList, TaskStatus } from '@/types/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateTaskData {
  description: string;
}

export const useCreateTask: MutateHook<CreateTaskData> = (queryKey) => {
  const queryClient = useQueryClient();

  const taskList: TaskList = queryClient.getQueryData(queryKey) ?? [];

  const addedTaskTempId = new Date().getTime();
  const addedTaskTempPriority = new Date().getTime();

  const setQueryData = () => {
    queryClient.setQueryData(queryKey, [...taskList]);
  };

  const { mutate, isLoading, isError } = useMutation<
    Task,
    unknown,
    CreateTaskData,
    void
  >(
    async ({ description }) => {
      taskList.unshift({
        id: addedTaskTempId,
        description,
        createdAt: new Date().toUTCString(),
        parentTaskId: null,
        priority: addedTaskTempPriority,
        status: TaskStatus.PENDING,
        subtasks: [],
      });

      setQueryData();

      //const task = actuallySendTaskToBackend()

      return taskList[0];
    },
    {
      onSuccess: (task) => {
        const taskIndex = taskList.findIndex((t) => t.id === addedTaskTempId);

        taskList.splice(taskIndex, 1, task);

        setQueryData();
      },
      onError: () => {
        // report error to user
        queryClient.setQueryData(
          queryKey,
          taskList.filter((task) => task.id !== addedTaskTempId)
        );
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
