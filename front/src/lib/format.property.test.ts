import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { formatHealthLabel } from './format'

describe('formatHealthLabel (properties)', () => {
  it('always returns a known label for any string', () => {
    fc.assert(
      fc.property(fc.string(), (status) => {
        expect(['Operational', 'Degraded']).toContain(formatHealthLabel(status))
      }),
    )
  })

  it('returns Operational exactly when the status normalizes to ok', () => {
    fc.assert(
      fc.property(fc.string(), (status) => {
        const isOk = status.trim().toLowerCase() === 'ok'
        expect(formatHealthLabel(status) === 'Operational').toBe(isOk)
      }),
    )
  })
})
