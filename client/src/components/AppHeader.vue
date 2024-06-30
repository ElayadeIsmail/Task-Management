<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Button } from './ui/button'
</script>

<template>
  <header class="container flex items-center justify-between h-12">
    <RouterLink class="italic font-bold text-2xl" to="/">Task-Management</RouterLink>
    <ul>
      <li class="space-x-2">
        <RouterLink to="/login">
          <Button>Login</Button>
        </RouterLink>
        <RouterLink to="/register">
          <Button variant="secondary">Register</Button>
        </RouterLink>
      </li>
    </ul>
  </header>
</template>
