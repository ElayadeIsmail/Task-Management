<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '../ui/button'
import { TrashIcon } from '@radix-icons/vue'
import { ref } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import * as tasksApi from '@/api/tasks.api'
import * as tasksAdapter from '@/adapter/tasks.adapter'
const props = defineProps<{ taskId: string }>()

const queryClient = useQueryClient()
const closeBtnRef = ref<null | HTMLButtonElement>(null)

const { mutate, isError, isPending } = useMutation({
  mutationFn: tasksApi.deleteTask,
  onSuccess(data) {
    queryClient.setQueryData<ReturnType<typeof tasksAdapter.adaptTasks>>(['tasks'], (old) => {
      if (!old) return old
      const updatedStatusArray = old[data.status].filter((_task) => _task.id !== data.id)
      // Return a new object with the updated array
      return {
        ...old,
        [data.status]: updatedStatusArray
      }
    })
    // close Modal
    closeBtnRef.value?.click()
  }
})

const onDelete = () => {
  mutate({ taskId: props.taskId })
}
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>
      <TrashIcon class="text-red-700" />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <span class="text-red-700 font-medium" v-show="isError"
        >Error While Trying to delete please try again</span
      >
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your task.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel :disabled="isPending" ref="closeBtnRef">Cancel</AlertDialogCancel>
        <Button @click="onDelete" :disabled="isPending" variant="destructive"> Delete </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
