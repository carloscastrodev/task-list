// We're not using the shorthand assignment here because if someone changes the order of the enum keys,
// it would also change the value assigned to each key. This way we're explicit as which value is which,
// and it should not be changed.
export enum TaskStatus {
  DELETED = 0,
  DONE = 1,
  PENDING = 2,
}

export interface Task {
  readonly id: number;
  description: string;
  status: TaskStatus;
  priority: number;
  parentTaskId: number | null;
  subtasks?: Task[];
  readonly createdAt: string;
  doneAt?: string;
  deletedAt?: string;
}

export type TaskList = Task[];
