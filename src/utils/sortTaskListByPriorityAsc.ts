import { TaskList } from '@/types/task';

export function sortTaskListByPriorityAsc(taskList: TaskList) {
  taskList.forEach((item) => {
    if (item.subtasks.length) {
      sortTaskListByPriorityAsc(item.subtasks);
    }
  });

  taskList.sort((taskA, taskB) => taskA.priority - taskB.priority);
}
