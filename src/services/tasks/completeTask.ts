import api from '@/services/api';
import { Task } from '@/types/task';

export async function completeTask(id: string) {
  const { data } = await api.put<Task>(`/tasks/completeTask/${id}`);

  return data;
}