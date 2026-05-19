import { HttpResponse, http } from 'msw'
import { describe, expect, it } from 'vitest'
import { server } from '../../mocks/server'
import { fetchHealth } from './health'

describe('fetchHealth', () => {
  it('returns the validated health payload', async () => {
    await expect(fetchHealth()).resolves.toEqual({ status: 'ok' })
  })

  it('throws when the request fails', async () => {
    server.use(
      http.get('http://localhost:8000/health', () =>
        HttpResponse.json({ detail: 'down' }, { status: 500 }),
      ),
    )
    await expect(fetchHealth()).rejects.toThrow('Health request failed')
  })

  it('throws when the response shape is invalid', async () => {
    server.use(
      http.get('http://localhost:8000/health', () =>
        HttpResponse.json({ status: 123 }),
      ),
    )
    await expect(fetchHealth()).rejects.toThrow()
  })
})
