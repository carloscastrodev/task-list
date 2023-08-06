import api from '@/services/api';
import { Task } from '@/types/task';

export async function createTask(description: string, parentTaskId?: number) {
  const { data } = await api.post<Task>(`/tasks`, {
    description,
    parentTaskId,
  });

  return data;
}
