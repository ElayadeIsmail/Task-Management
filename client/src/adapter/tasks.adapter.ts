import { TaskStatus, type ITasksResult } from '@/types'

export const tasksAdapter = (data: ITasksResult) => {
  return data.reduce<{
    [TaskStatus.ToDo]: ITasksResult
    [TaskStatus.Pending]: ITasksResult
    [TaskStatus.Done]: ITasksResult
  }>(
    (acc, current) => {
      acc[current.status].push({ ...current })
      return acc
    },
    {
      [TaskStatus.ToDo]: [],
      [TaskStatus.Pending]: [],
      [TaskStatus.Done]: []
    }
  )
}
