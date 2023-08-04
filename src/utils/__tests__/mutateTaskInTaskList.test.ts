import { taskListMock } from '@/mocks/tasks';
import { Task, TaskList, TaskStatus } from '@/types/task';
import { mutateTaskInTaskList } from '@/utils';

describe(`@/utils - mutateTaskInTaskList`, () => {
  let taskList: TaskList = [...taskListMock];

  beforeEach(() => {
    taskList = [...taskListMock];
  });

  test('It should mutate a Task in a TaskList if the Task given is already in the list', () => {
    const task = taskList[0];

    const updatedTask: Task = { ...task, status: TaskStatus.DONE };

    mutateTaskInTaskList(taskList, updatedTask);

    expect(taskList[0].status).toEqual(TaskStatus.DONE);
  });

  test('It should not mutate any Tasks in a TaskList if the Task given is not in the list', () => {
    const task = taskList[0];

    const updatedTask: Task = { ...task, id: -1, status: TaskStatus.DONE };

    mutateTaskInTaskList(taskList, updatedTask);

    expect(
      taskList.every((t) => t.status === TaskStatus.PENDING && t.id > 0)
    ).toEqual(true);
  });

  test('It should correctly mutate a Task inside another Task subtasks list', () => {
    const task = taskList[0];

    const childTask: Task = { ...task, parentTaskId: task.id };

    const updatedTask: Task = { ...task, subtasks: [childTask] };

    mutateTaskInTaskList(taskList, updatedTask);

    expect(taskList[0].subtasks[0].status).toEqual(TaskStatus.PENDING);

    const updatedChildTask: Task = { ...childTask, status: TaskStatus.DONE };

    mutateTaskInTaskList(taskList, updatedChildTask);

    expect(taskList[0].subtasks[0].status).toEqual(TaskStatus.DONE);
  });
});
