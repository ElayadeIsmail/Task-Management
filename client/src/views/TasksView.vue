<script setup lang="ts">
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import * as tasksApi from '@/api/tasks.api'
import * as tasksAdapter from '@/adapter/tasks.adapter'
import type { ITask, TaskStatus } from '@/types'
import { TaskColumn, TasksCreate } from '@/components/tasks'

const queryClient = useQueryClient()

const { mutate } = useMutation({
  mutationFn: tasksApi.updateStatus
})

const { isPending, isError, data, error } = useQuery({
  queryKey: ['tasks'],
  queryFn: () => tasksApi.getTasks().then((data) => tasksAdapter.adaptTasks(data || []))
})

const onDrop = async (evt: DragEvent, taskStatus: TaskStatus) => {
  if (!evt.dataTransfer || !data.value) return
  const task = JSON.parse(evt.dataTransfer.getData('task')) as ITask
  if (!task) return
  mutate(
    {
      taskId: task.id,
      newStatus: taskStatus
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData<ReturnType<typeof tasksAdapter.adaptTasks>>(['tasks'], (old) => {
          if (!old) return old
          const updatedPrev = old[task.status].filter((_task) => _task.id !== task.id)
          const updatedNewArray = [data, ...old[taskStatus]]
          // Return a new object with the updated array
          return {
            ...old,
            [task.status]: updatedPrev,
            [taskStatus]: updatedNewArray
          }
        })
      }
    }
  )
}
</script>

<template>
  <main class="container py-12">
    <div class="flex items-center justify-end mb-4">
      <TasksCreate />
    </div>
    <div v-if="isPending">Loading...</div>
    <div v-else-if="isError">An error has occurred: {{ error }}</div>
    <div v-else-if="data">
      <div class="grid grid-cols-3 justify-center gap-4 flex-col py-4">
        <TaskColumn
          v-for="[key, values] in Object.entries(data)"
          :data="values"
          @on-drop="onDrop"
          :title="`${key} Tasks`"
          :status="key as TaskStatus"
          :key="key"
        />
      </div>
    </div>
  </main>
</template>
