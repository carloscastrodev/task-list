import { deleteTask } from '@/services/tasks';
import { MutateHook } from '@/types/hooks';
import { ServiceError } from '@/types/services';
import { Task, TaskList, TaskStatus } from '@/types/task';
import { useFeedbackDialog } from '@/ui/components/Dialog/FeedbackDialog/useFeedbackDialog';
import { getParentTaskIndex, mutateTaskInTaskList } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteTask: MutateHook<Task> = (queryKey) => {
  const queryClient = useQueryClient();
  const { showFeedback } = useFeedbackDialog();

  const taskList: TaskList = queryClient.getQueryData(queryKey) ?? [];

  const setQueryData = () => {
    queryClient.setQueryData(queryKey, [...taskList]);
  };

  const removeTaskFromList = (task: Task) => {
    const taskIndex = taskList.findIndex((t) => t.id === task.id);

    taskList.splice(taskIndex, 1);

    setQueryData();
  };

  const removeSubtaskFromList = (subtask: Task) => {
    const parentIndex = getParentTaskIndex(taskList, subtask);

    if (parentIndex === -1) {
      throw new Error('Parent task not found');
    }

    const subtaskIndex = taskList[parentIndex].subtasks!.findIndex(
      (t) => t.id === subtask.id
    );

    taskList[parentIndex].subtasks?.splice(subtaskIndex, 1);

    setQueryData();
  };

  const { mutate, isLoading, isError } = useMutation<
    Task,
    ServiceError,
    Task,
    void
  >(
    async (task) => {
      const deletedTask: Task = {
        ...task,
        deletedAt: new Date().toUTCString(),
        status: TaskStatus.DELETED,
      };

      mutateTaskInTaskList(taskList, deletedTask);

      setQueryData();

      await deleteTask(task.id);

      return task;
    },
    {
      onSuccess: (deletedTask) => {
        if (deletedTask.parentTaskId) {
          removeSubtaskFromList(deletedTask);
        } else {
          removeTaskFromList(deletedTask);
        }
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
        ? "Couldn't delete task. Reload the page and try again."
        : undefined,
  };
};
