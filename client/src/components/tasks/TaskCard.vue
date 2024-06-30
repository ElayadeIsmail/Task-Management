<script setup lang="ts">
import { cn } from '@/lib/utils'
import { type ITask, TaskStatus } from '@/types'
const props = defineProps<{
  task: ITask
  status: TaskStatus
}>()
</script>

<template>
  <div class="rounded-lg shadow p-4 cursor-pointer bg-white" :key="props.task.id">
    <span
      :class="
        cn('font-bold capitalize mb-2 line-clamp-1', {
          'line-through': props.status === TaskStatus.Done
        })
      "
      >{{ task.title }}</span
    >
    <p class="text-sm text-neutral-400">{{ task.description }}</p>
  </div>
</template>
