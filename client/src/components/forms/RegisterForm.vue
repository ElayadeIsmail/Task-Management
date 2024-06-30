<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = toTypedSchema(
  z
    .object({
      username: z
        .string({
          required_error: 'Username is required'
        })
        .regex(/^[a-zA-Z0-9_-]{4,12}$/, {
          message:
            'Username must be 4-12 characters long and can only contain letters, numbers, underscores, and hyphens'
        }),
      password: z
        .string({ required_error: 'Password is required' })
        .regex(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
          message:
            'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number or special character'
        }),
      confirmPassword: z.string({ required_error: 'confirmPassword is required' })
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'The passwords did not match',
          path: ['confirmPassword']
        })
      }
    })
)

const { isFieldDirty, handleSubmit, isSubmitting } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit(async (values) => {
  console.log('values', values)
})
</script>

<template>
  <form class="space-y-3" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input
            type="text"
            autocomplete="username"
            placeholder="username"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input
            type="password"
            autocomplete="new-password"
            placeholder="*********"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="confirmPassword" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Confirm Password</FormLabel>
        <FormControl>
          <Input
            type="password"
            autocomplete="new-password"
            placeholder="********"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button class="w-full" size="lg" type="submit" :disabled="isSubmitting"> Submit </Button>
  </form>
</template>
