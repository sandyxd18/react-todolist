import { request } from '../request'

export const task = {
  getAll: async () => await request('/tasks/'),
  create: async (task) => await request('/tasks/', 'POST', task),
  update: async (taskId, newTask) =>
    await request(`/tasks/${taskId}`, 'PUT', newTask),
  delete: async (taskId) => await request(`/tasks/${taskId}`, 'DELETE'),
  getCountIncompleteTask: async () => await request('/task/incomplete', 'GET'),
}
