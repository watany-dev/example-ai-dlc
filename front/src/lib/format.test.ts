import { describe, expect, it } from 'vitest'
import { formatHealthLabel } from './format'

describe('formatHealthLabel', () => {
  it('labels an ok status as operational', () => {
    expect(formatHealthLabel('ok')).toBe('Operational')
  })

  it('ignores surrounding whitespace and casing', () => {
    expect(formatHealthLabel('  OK  ')).toBe('Operational')
  })

  it('labels any other status as degraded', () => {
    expect(formatHealthLabel('error')).toBe('Degraded')
  })
})
