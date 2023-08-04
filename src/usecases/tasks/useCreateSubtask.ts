import { MutateHook } from '@/types/hooks';
import { Task, TaskList, TaskStatus } from '@/types/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateSubtaskData {
  description: string;
  parentTask: Task;
}

export const useCreateSubtask: MutateHook<CreateSubtaskData> = (queryKey) => {
  const queryClient = useQueryClient();

  const taskList: TaskList = queryClient.getQueryData(queryKey) ?? [];

  const addedTaskTempId = new Date().getTime();

  const setQueryData = () => {
    queryClient.setQueryData(queryKey, [...taskList]);
  };

  const getParentIndex = (parentTaskId: number) => {
    return taskList.findIndex((t) => t.id === parentTaskId);
  };

  const { mutate, isLoading, isError } = useMutation<
    Task,
    unknown,
    CreateSubtaskData,
    void
  >(
    async ({ description, parentTask }) => {
      const parentTaskIndex = getParentIndex(parentTask.id);

      taskList[parentTaskIndex].subtasks.unshift({
        id: addedTaskTempId,
        description,
        createdAt: new Date().toUTCString(),
        parentTaskId: parentTask.id,
        priority: 0,
        status: TaskStatus.PENDING,
        subtasks: [],
      });

      setQueryData();

      //const task = actuallySendTaskToBackend()

      return taskList[parentTaskIndex].subtasks[0];
    },
    {
      onSuccess: (task) => {
        const parentTaskIndex = getParentIndex(task.parentTaskId!);

        const taskIndex = taskList[parentTaskIndex].subtasks.findIndex(
          (t) => t.id === addedTaskTempId
        );

        taskList[parentTaskIndex].subtasks.splice(taskIndex, 1, task);

        setQueryData();
      },
      onError: (_, { parentTask }) => {
        // report error to user
        const parentTaskIndex = getParentIndex(parentTask.id);

        const taskIndex = taskList[parentTaskIndex].subtasks.findIndex(
          (t) => t.id === addedTaskTempId
        );

        taskList[parentTaskIndex].subtasks.splice(taskIndex, 1);
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
