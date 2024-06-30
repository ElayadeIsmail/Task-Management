import { getErrorMessage } from '@/lib/utils'
import type { IAuthResult } from '@/types'
import { client } from './client'

export type AuthOPtions =
  | { url: '/authentication/sign-in'; body: { username: string; password: string } }
  | {
      url: '/authentication/sign-up'
      body: { username: string; password: string; confirmPassword: string }
    }
  | { url: '/authentication/refresh-token'; body: {} }

export const authenticateUser = async ({ url, body }: AuthOPtions) => {
  try {
    const result = await client.post<null, IAuthResult>(url, body)
    return { status: 'success', data: result } as const
  } catch (error) {
    console.log(error)
    return { status: 'error', message: getErrorMessage(error) } as const
  }
}

export const getCurrentUser = async () => {
  try {
    const result = await client.get<null, IAuthResult>('/authentication/current-user')
    return { status: 'success', data: result } as const
  } catch (error) {
    return { status: 'error', message: getErrorMessage(error) } as const
  }
}

export const refreshToken = async () => {
  try {
    const result = await client.post<null, IAuthResult>('/authentication/refresh-token', {})
    return { status: 'success', data: result } as const
  } catch (error) {
    return { status: 'error', message: getErrorMessage(error) } as const
  }
}

export const logout = async () => {
  try {
    const result = await client.post<null, IAuthResult>('/authentication/logout', {})
    return { status: 'success', data: result } as const
  } catch (error) {
    return { status: 'error', message: getErrorMessage(error) } as const
  }
}
