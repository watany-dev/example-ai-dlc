import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HttpResponse, http } from 'msw'
import { describe, expect, it } from 'vitest'
import { server } from '../mocks/server'
import { renderWithClient } from '../test/render'
import { HealthStatus } from './HealthStatus'

describe('HealthStatus', () => {
  it('shows a checking state while the request is in flight', async () => {
    renderWithClient(<HealthStatus />)
    expect(screen.getByText('Checking…')).toBeInTheDocument()
    await screen.findByText('Operational')
  })

  it('shows the operational label once health resolves', async () => {
    renderWithClient(<HealthStatus />)
    expect(await screen.findByText('Operational')).toBeInTheDocument()
  })

  it('shows an alert when the health request fails', async () => {
    server.use(
      http.get('http://localhost:8000/health', () =>
        HttpResponse.json({ detail: 'down' }, { status: 500 }),
      ),
    )
    renderWithClient(<HealthStatus />)
    expect(await screen.findByRole('alert')).toHaveTextContent('Unavailable')
  })

  it('re-checks health when Refresh is clicked', async () => {
    renderWithClient(<HealthStatus />)
    expect(await screen.findByText('Operational')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Refresh' }))
    expect(await screen.findByText('Operational')).toBeInTheDocument()
  })
})
