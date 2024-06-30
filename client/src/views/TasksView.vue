<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import * as tasksApi from '@/api/tasks.api'
import * as tasksAdapter from '@/adapter/tasks.adapter'
import type { TaskStatus } from '@/types'
import { TaskColumn } from '@/components/tasks'

const { isPending, isError, data, error } = useQuery({
  queryKey: ['tasks'],
  queryFn: () => tasksApi.getTasks().then((data) => tasksAdapter.adaptTasks(data || []))
})
</script>

<template>
  <main class="container py-12">
    <div v-if="isPending">Loading...</div>
    <div v-else-if="isError">An error has occurred: {{ error }}</div>
    <div v-else-if="data">
      <div class="grid grid-cols-3 justify-center gap-4 flex-col py-4">
        <TaskColumn
          v-for="[key, values] in Object.entries(data)"
          :data="values"
          :title="`${key} Tasks`"
          :status="key as TaskStatus"
          :key="key"
        />
      </div>
    </div>
  </main>
</template>
