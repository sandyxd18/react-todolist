import { request } from '../request'

export const admin = {
  getAllUsers: async () => {
    try {
      const response = await request('/admin/users', 'GET')
      if (response && Array.isArray(response.data)) {
        return response.data
      } else {
        console.error('Unexpected response format:', response)
        return []
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
      return []
    }
  },

  getUserIncompleteTasks: async (userId) =>
    await request(`/admin/user/${userId}/tasks/incomplete`, 'GET'),
  changeUserPassword: async (userId, newPassword) =>
    await request(`/admin/user/${userId}/password`, 'PUT', {
      new_password: newPassword,
    }),
  createUser: async (user) => await request('/admin/user', 'POST', user),
  deleteUser: async (userId) =>
    await request(`/admin/user/${userId}`, 'DELETE'),
}
