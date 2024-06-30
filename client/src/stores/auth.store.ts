import * as authApi from '@/api/auth.api'
import type { IAuthResult } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('user', () => {
  const user = ref<IAuthResult | null>(null)

  async function authenticate(options: authApi.AuthOPtions) {
    const { status, data, message } = await authApi.authenticateUser(options)
    if (status === 'success') {
      user.value = data
      return { status, data } as const
    } else {
      user.value = null
      return { status, message } as const
    }
  }

  async function hybridUser() {
    const { status, data } = await authApi.getCurrentUser()
    if (status === 'success') {
      user.value = data
    } else {
      user.value = null
    }
  }

  return { user, authenticate, hybridUser }
})
