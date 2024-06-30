export type IAuthResult = {
  id: string
  username: string
}

export enum TaskStatus {
  ToDo = 'ToDo',
  Pending = 'Pending',
  Done = 'Done'
}

export type ITask = {
  id: string
  title: string
  description: string
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

export type ITasksResult = ITask[]
