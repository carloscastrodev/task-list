import { Task, TaskList, TaskStatus } from '@/types/task';

export const taskMock: Task = {
  id: 0,
  description: 'Task',
  status: TaskStatus.PENDING,
  priority: 0,
  createdAt: '2023-08-03 15:00:00',
  subtasks: [],
  parentTaskId: null,
};

const TASK_LIST_MOCK_LENGTH = 10;

export const taskListMock: TaskList = Array.from({
  length: TASK_LIST_MOCK_LENGTH,
}).map((_, i) => ({
  id: TASK_LIST_MOCK_LENGTH - i,
  description: `Task ${i}`,
  priority: i,
  status: TaskStatus.PENDING,
  createdAt: '2023-08-03 15:00:00',
  subtasks: [],
  parentTaskId: null,
}));
