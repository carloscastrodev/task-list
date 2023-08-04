import { MutateHook } from '@/types/hooks';
import { Task, TaskList, TaskStatus } from '@/types/task';
import { getParentTaskIndex, mutateTaskInTaskList } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteTask: MutateHook<Task> = (queryKey) => {
  const queryClient = useQueryClient();

  const taskList: TaskList = queryClient.getQueryData(queryKey) ?? [];

  const setQueryData = () => {
    queryClient.setQueryData(queryKey, [...taskList]);
  };

  const deleteTask = (task: Task) => {
    const taskIndex = taskList.findIndex((t) => t.id === task.id);

    taskList.splice(taskIndex, 1);

    setQueryData();
  };

  const deleteSubtask = (subtask: Task) => {
    const parentIndex = getParentTaskIndex(taskList, subtask);

    if (parentIndex === -1) {
      throw new Error('Parent task not found');
    }

    const subtaskIndex = taskList[parentIndex].subtasks.findIndex(
      (t) => t.id === subtask.id
    );

    taskList[parentIndex].subtasks.splice(subtaskIndex, 1);

    setQueryData();
  };

  const { mutate, isLoading, isError } = useMutation<Task, unknown, Task, void>(
    async (task) => {
      const deletedTask: Task = {
        ...task,
        deletedAt: new Date().toUTCString(),
        status: TaskStatus.DELETED,
      };

      mutateTaskInTaskList(taskList, deletedTask);

      setQueryData();

      //const task = actuallySendTaskToBackend()

      return deletedTask;
    },
    {
      onSuccess: (deletedTask) => {
        if (deletedTask.parentTaskId) {
          deleteSubtask(deletedTask);
        } else {
          deleteTask(deletedTask);
        }
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
        ? "Couldn't delete task. Reload the page and try again."
        : undefined,
  };
};
