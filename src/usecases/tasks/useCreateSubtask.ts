import { createTask } from '@/services/tasks';
import { MutateHook } from '@/types/hooks';
import { ServiceError } from '@/types/services';
import { Task, TaskList, TaskStatus } from '@/types/task';
import { useFeedbackDialog } from '@/ui/components/Dialog/FeedbackDialog/useFeedbackDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateSubtaskData {
  description: string;
  parentTask: Task;
}

export const useCreateSubtask: MutateHook<CreateSubtaskData> = (queryKey) => {
  const queryClient = useQueryClient();
  const { showFeedback } = useFeedbackDialog();

  const taskList: TaskList = queryClient.getQueryData(queryKey) ?? [];

  const addedTaskTempId = -1;
  const addedTaskTempPriority = -1;

  const setQueryData = () => {
    queryClient.setQueryData(queryKey, [...taskList]);
  };

  const getParentIndex = (parentTaskId: number) => {
    return taskList.findIndex((t) => t.id === parentTaskId);
  };

  const { mutate, isLoading, isError } = useMutation<
    Task,
    ServiceError,
    CreateSubtaskData,
    void
  >(
    async ({ description, parentTask }) => {
      const parentTaskIndex = getParentIndex(parentTask.id);

      taskList[parentTaskIndex].subtasks?.unshift({
        id: addedTaskTempId,
        description,
        createdAt: new Date().toUTCString(),
        parentTaskId: parentTask.id,
        priority: addedTaskTempPriority,
        status: TaskStatus.PENDING,
        subtasks: [],
      });

      setQueryData();

      return await createTask({
        description,
        priority: addedTaskTempPriority,
        parentTaskId: parentTask.id,
      });
    },
    {
      onSuccess: (task) => {
        const parentTaskIndex = getParentIndex(task.parentTaskId!);

        const taskIndex = taskList[parentTaskIndex].subtasks!.findIndex(
          (t) => t.id === addedTaskTempId
        );

        taskList[parentTaskIndex].subtasks!.splice(taskIndex, 1, task);

        setQueryData();
      },
      onError: (error, { parentTask }) => {
        showFeedback(error.response?.data?.message);
        const parentTaskIndex = getParentIndex(parentTask.id);

        const taskIndex = taskList[parentTaskIndex].subtasks!.findIndex(
          (t) => t.id === addedTaskTempId
        );

        taskList[parentTaskIndex].subtasks!.splice(taskIndex, 1);
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
