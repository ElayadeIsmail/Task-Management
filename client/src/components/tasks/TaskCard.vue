<script setup lang="ts">
import { cn } from '@/lib/utils'
import { type ITask, TaskStatus } from '@/types'
import DeleteTask from './DeleteTask.vue'
const props = defineProps<{
  task: ITask
  status: TaskStatus
}>()

const startDrag = (evt: DragEvent, task: ITask) => {
  if (!evt.dataTransfer) return
  evt.dataTransfer.dropEffect = 'move'
  evt.dataTransfer.effectAllowed = 'move'
  evt.dataTransfer.setData('task', JSON.stringify(task))
}
</script>

<template>
  <div
    draggable="true"
    @dragstart="startDrag($event, task)"
    class="rounded-lg shadow p-4 cursor-pointer bg-white"
    :key="props.task.id"
  >
    <div class="flex items-center justify-end">
      <DeleteTask :task-id="task.id" />
    </div>
    <span
      :class="
        cn('font-bold capitalize mb-2', {
          'line-through': props.status === TaskStatus.Done
        })
      "
      >{{ task.title }}</span
    >
    <p class="text-sm text-neutral-400">{{ task.description }}</p>
  </div>
</template>
