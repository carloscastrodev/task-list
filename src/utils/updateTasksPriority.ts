import { TaskList } from '@/types/task';

export function updateTasksPriority(taskList: TaskList): TaskList {
  taskList.forEach((task, index) => {
    // TODO -> This optional (?) here is due to a bug related to the complete task api response. Should be resolved there before removing the optional here.
    if (task.subtasks?.length) {
      updateTasksPriority(task.subtasks);
    }

    task.priority = index + 1;
  });

  return taskList;
}
