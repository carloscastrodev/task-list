import { taskListMock } from '@/mocks/tasks';
import { TaskList } from '@/types/task';
import { updateTasksPriority } from '@/utils';

describe(`@/utils - updateTasksPriority`, () => {
  let taskList: TaskList = [...taskListMock];

  beforeEach(() => {
    taskList = [...taskListMock].sort((a, b) => b.priority - a.priority);
  });

  test('It should apply priority to each item equal to its index + 1', () => {
    updateTasksPriority(taskList);

    const everyTaskListItemHasEqualOrLessPriorityThanNext = taskList.every(
      (current, index) => {
        if (taskList[index + 1]) {
          return current.priority <= taskList[index + 1]?.priority;
        }

        return true;
      }
    );

    expect(everyTaskListItemHasEqualOrLessPriorityThanNext).toEqual(true);
  });
});
