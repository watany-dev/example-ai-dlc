import { z } from 'zod'
import { client } from './client'

export const healthSchema = z.object({
  status: z.string(),
})

export type Health = z.infer<typeof healthSchema>

export async function fetchHealth(): Promise<Health> {
  const { data, error } = await client.GET('/health')
  if (error) {
    throw new Error('Health request failed')
  }
  return healthSchema.parse(data)
}
