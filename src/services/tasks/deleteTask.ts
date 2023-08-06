import api from '@/services/api';

export async function deleteTask(id: number) {
  await api.delete<void>(`/tasks/${id}`);
}
