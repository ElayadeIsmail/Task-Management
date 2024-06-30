import type { ITask, ITasksResult, TaskStatus } from '@/types'
import { client } from './client'

export const createTask = async (data: Pick<ITask, 'title' | 'description' | 'status'>) =>
  client.post<null, ITask>('/tasks', data)

export const updateStatus = ({ newStatus, taskId }: { taskId: string; newStatus: TaskStatus }) => {
  return client.patch<null, ITask>(`/tasks/${taskId}`, { status: newStatus })
}

export const deleteTask = ({ taskId }: { taskId: string }) => {
  return client.delete<null, ITask>(`/tasks/${taskId}`)
}

export const getTasks = () => client.get<null, ITasksResult>(`/tasks`)
