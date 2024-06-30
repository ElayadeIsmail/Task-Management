<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import * as authApi from '@/api/auth.api'
import { ref } from 'vue'

const formError = ref<null | string>(null)

const formSchema = toTypedSchema(
  z.object({
    username: z.string({ required_error: 'Username is required' }),
    password: z.string({ required_error: 'Password is required' })
  })
)

const { isFieldDirty, handleSubmit, isSubmitting } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit(async (values) => {
  formError.value = null
  const { status, data, message } = await authApi.authenticateUser({
    url: '/authentication/sign-in',
    body: values
  })
  if (status === 'success') {
    console.log(data)
  } else {
    formError.value = message
  }
})
</script>

<template>
  <form class="space-y-3" @submit="onSubmit">
    <span
      v-if="!!formError"
      class="text-destructive flex justify-center mx-auto text-center font-medium"
      >{{ formError }}</span
    >
    <FormField v-slot="{ componentField }" name="username" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input
            autocomplete="username"
            type="text"
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
            autocomplete="current-password"
            placeholder="********"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button class="w-full" :disabled="isSubmitting" size="lg" type="submit"> Submit </Button>
  </form>
</template>
