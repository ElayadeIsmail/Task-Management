<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from './ui/button'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
</script>

<template>
  <header class="container flex items-center justify-between h-12">
    <RouterLink class="italic font-bold text-2xl" to="/">Task-Management</RouterLink>
    <ul>
      <li class="space-x-2">
        <!-- Auth Btn -->
        <template v-if="authStore.user">
          <RouterLink to="/tasks">
            <Button variant="secondary">Tasks</Button>
          </RouterLink>

          <Button>Logout</Button>
        </template>

        <!-- Not Auth -->
        <template v-else>
          <RouterLink to="/login">
            <Button>Login</Button>
          </RouterLink>
          <RouterLink to="/register">
            <Button variant="secondary">Register</Button>
          </RouterLink>
        </template>
      </li>
    </ul>
  </header>
</template>
