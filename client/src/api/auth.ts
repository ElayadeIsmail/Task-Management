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
    return { status: 'error', message: getErrorMessage(error) } as const
  }
}
