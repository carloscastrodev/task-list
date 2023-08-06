import api from '@/services/api';

export async function updatePriorities(prioritiesMap: Record<number, number>) {
  const { data } = await api.put('/tasks/priorities', prioritiesMap);

  return data;
}
