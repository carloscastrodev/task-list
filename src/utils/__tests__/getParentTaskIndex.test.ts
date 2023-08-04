import { taskListMock, taskMock } from '@/mocks/tasks';
import { Task, TaskList } from '@/types/task';
import { getParentTaskIndex } from '@/utils';

describe(`@/utils - getParentTaskIndex`, () => {
  const taskList: TaskList = [...taskListMock];
  const childTask: Task = { ...taskMock, parentTaskId: taskList[0].id };

  beforeEach(() => {
    taskList[0].subtasks = [childTask];
  });

  test('It should return -1 when the given task has no parent', () => {
    const index = getParentTaskIndex(taskList, taskList[0]);

    expect(index).toEqual(-1);
  });

  test('It should return the corrent index when searching for a parent of a task that exists', () => {
    const index = getParentTaskIndex(taskList, childTask);

    expect(index).toEqual(0);
  });
});
