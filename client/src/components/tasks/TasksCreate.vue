<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import * as tasksAdapter from '@/adapter/tasks.adapter'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { TaskStatus } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import * as tasksApi from '@/api/tasks.api'
import { ref } from 'vue'
const queryClient = useQueryClient()

// take ref to close btn so we can close modal after creating task
const closeBtnRef = ref<HTMLButtonElement | null>(null)

const { mutate, isPending, isError } = useMutation({
  mutationFn: tasksApi.createTask,
  onSuccess: (data) => {
    queryClient.setQueryData<ReturnType<typeof tasksAdapter.adaptTasks>>(['tasks'], (old) => {
      if (!old) return old
      const updatedStatusArray = [data, ...old[data.status]]
      // Return a new object with the updated array
      return {
        ...old,
        [data.status]: updatedStatusArray
      }
    })
    closeBtnRef.value?.click()
  }
})

const formSchema = toTypedSchema(
  z.object({
    title: z.string({ required_error: 'title is required' }),
    description: z.string({ required_error: 'Description is required' }),
    status: z.enum([TaskStatus.ToDo, TaskStatus.Pending, TaskStatus.Done], {
      required_error: 'Please Select A Status'
    })
  })
)

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit((values) => {
  mutate(values)
})
</script>

<template>
  <Dialog>
    <Button :as-child="true">
      <DialogTrigger> Create Task </DialogTrigger>
    </Button>

    <DialogContent>
      <DialogHeader>
        <DialogTitle class="mb-4">Create New Task</DialogTitle>
      </DialogHeader>

      <span v-show="isError">Error While creating task</span>

      <form class="space-y-3" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="title" :validate-on-blur="!isFieldDirty">
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input type="text" placeholder="title" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="description" :validate-on-blur="!isFieldDirty">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Description" class="resize-none" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="status" :validate-on-blur="!isFieldDirty">
          <FormItem>
            <FormLabel>Status</FormLabel>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem :value="TaskStatus.ToDo">To Do </SelectItem>
                  <SelectItem :value="TaskStatus.Pending">Pending</SelectItem>
                  <SelectItem :value="TaskStatus.Done">Done</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter>
          <Button class="w-full" :disabled="isPending" type="submit">Submit</Button>
        </DialogFooter>
      </form>
      <DialogClose asChild class="w-0 h-0">
        <button ref="closeBtnRef" class="w-0 h-0" type="button"></button>
      </DialogClose>
    </DialogContent>
  </Dialog>
</template>
