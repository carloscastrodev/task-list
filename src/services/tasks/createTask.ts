import api from '@/services/api';
import { Task } from '@/types/task';

export async function createTask({
  description,
  parentTaskId,
}: {
  description: string;
  priority: number;
  parentTaskId?: number;
}) {
  const { data } = await api.post<Task>(`/tasks`, {
    description,
    parentTaskId,
  });

  return data;
}
