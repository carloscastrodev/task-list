import api from '@/services/api';
import { TaskList } from '@/types/task';

export async function listTasks() {
  const { data } = await api.get<TaskList>('/tasks');

  return data;
}
