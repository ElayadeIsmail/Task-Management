<script setup lang="ts">
import { type ITask } from '@/types'
import TaskCard from './TaskCard.vue'

const props = defineProps<{
  data: ITask[]
  title: string
  status: ITask['status']
}>()

const emits = defineEmits(['onDrop'])
</script>

<template>
  <div
    @drop="emits('onDrop', $event, props.status)"
    @dragover.prevent
    @dragenter.prevent
    class="flex flex-col rounded-md border p-4 bg-neutral-50 h-fit"
  >
    <h2 class="text-center font-bold text-3xl text-neutral-600 mb-4">{{ props.title }}</h2>
    <div class="flex flex-col space-y-3">
      <TaskCard v-for="task in props.data" :task="task" :key="task.id" :status="props.status" />
    </div>
  </div>
</template>
