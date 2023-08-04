import { taskListMock } from '@/mocks/tasks';
import { TaskList } from '@/types/task';
import { sortTaskListByPriorityAsc } from '@/utils';

describe(`@/utils - sortTaskListByPriorityAsc`, () => {
  let taskList: TaskList = [...taskListMock];

  beforeEach(() => {
    taskList = [...taskListMock].sort((a, b) => b.priority - a.priority);
  });

  test('It should sort a TaskList in place by priority ascending', () => {
    sortTaskListByPriorityAsc(taskList);

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
