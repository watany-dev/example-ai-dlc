import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { renderWithClient } from './test/render'

describe('App', () => {
  it('renders the application heading', async () => {
    renderWithClient(<App />)
    expect(
      screen.getByRole('heading', { name: 'example-ai-dlc', level: 1 }),
    ).toBeInTheDocument()
    await screen.findByText('Operational')
  })
})
