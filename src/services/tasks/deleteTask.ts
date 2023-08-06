import api from '@/services/api';

export async function deleteTask(id: string) {
  await api.delete<void>(`/tasks/${id}`);
}
