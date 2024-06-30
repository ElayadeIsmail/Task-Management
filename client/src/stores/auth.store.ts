import { type AuthOPtions, authenticateUser } from '@/api/auth.api'
import type { IAuthResult } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('user', () => {
  const user = ref<IAuthResult | null>(null)

  async function authenticate(options: AuthOPtions) {
    const { status, data, message } = await authenticateUser(options)
    if (status === 'success') {
      user.value = data
    } else {
      user.value = null
    }
    return { status, data, message }
  }

  return { user, authenticate }
})
