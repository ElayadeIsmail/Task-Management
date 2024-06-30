<script setup lang="ts">
import { RegisterForm } from '@/components/forms'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div className="flex min-h-full flex-col justify-center pt-20">
    <div className="text-center">
      <h1 className="text-5xl font-bold text-primary">Let&apos;s start your journey!</h1>
      <p className="mt-3 text-xl text-muted-foreground">Please enter your details.</p>
    </div>

    <div className="mx-auto space-y-4 o w-full max-w-md px-8 mt-8">
      <!-- Register From -->
      <hr />
      <RegisterForm />
      <div className="flex items-center justify-center gap-2 ">
        <span className="text-muted-foreground"> Already have an account? </span>
        <RouterLink to="/login">Sign In</RouterLink>
      </div>
    </div>
  </div>
</template>
