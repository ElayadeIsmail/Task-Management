<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { LoginForm } from '@/components/forms'
</script>

<template>
  <div className="flex min-h-full flex-col justify-center pt-20">
    <div className="mx-auto w-full max-w-md">
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-5xl font-bold text-primary">Welcome back!</h1>
        <p className="text-xl text-muted-foreground">Please enter your details.</p>
      </div>
      <div className="mx-auto space-y-4 w-full max-w-md px-8 mt-8">
        <hr />
        <!-- Form To Be here -->
        <LoginForm />
        <div className="flex items-center justify-center gap-2 ">
          <span className="text-muted-foreground">New here?</span>
          <RouterLink to="/register">Create an account</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
