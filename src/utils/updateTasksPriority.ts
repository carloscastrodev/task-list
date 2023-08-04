import { TaskList } from '@/types/task';

export function updateTasksPriority(taskList: TaskList): TaskList {
  taskList.forEach((task, index) => {
    if (task.subtasks.length) {
      updateTasksPriority(task.subtasks);
    }

    task.priority = index + 1;
  });

  return taskList;
}
