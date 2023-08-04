import { Task, TaskList } from '@/types/task';

export function getParentTaskIndex(taskList: TaskList, task: Task) {
  if (!task.parentTaskId) {
    return -1;
  }

  return taskList.findIndex((t) => t.id === task.parentTaskId);
}
