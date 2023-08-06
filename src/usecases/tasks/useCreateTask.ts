import { createTask } from '@/services/tasks';
import { MutateHook } from '@/types/hooks';
import { Task, TaskList, TaskStatus } from '@/types/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateTaskData {
  description: string;
}

export const useCreateTask: MutateHook<CreateTaskData> = (queryKey) => {
  const queryClient = useQueryClient();

  const taskList: TaskList = queryClient.getQueryData(queryKey) ?? [];

  const addedTaskTempId = -1;
  const addedTaskTempPriority = -1;

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

      return await createTask({
        description,
        priority: addedTaskTempPriority,
      });
    },
    {
      onSuccess: (task) => {
        const taskIndex = taskList.findIndex((t) => t.id === addedTaskTempId);

        taskList.splice(taskIndex, 1, task);

        setQueryData();
      },
      onError: () => {
        // report error to user
        console.log('err', taskList, addedTaskTempId);

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
