import { Task, TaskList } from '@/types/task';

export function mutateTaskInTaskList(taskList: TaskList, task: Task) {
  if (task.parentTaskId) {
    const parentIndex = taskList.findIndex((t) => t.id === task.parentTaskId);

    if (parentIndex === -1) return;

    const taskIndex = taskList[parentIndex].subtasks.findIndex(
      (t) => t.id === task.id
    );

    if (taskIndex === -1) return;

    taskList[parentIndex].subtasks[taskIndex] = task;
  } else {
    const taskIndex = taskList.findIndex((t) => t.id === task.id);

    if (taskIndex === -1) return taskList;

    taskList[taskIndex] = task;
  }
}
