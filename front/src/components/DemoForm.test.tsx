import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { DemoForm } from './DemoForm'

describe('DemoForm', () => {
  it('shows a validation error for a too-short project name', async () => {
    render(<DemoForm />)
    await userEvent.type(screen.getByLabelText('Project name'), 'ab')
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Project name must be at least 3 characters',
    )
  })

  it('accepts a valid project name', async () => {
    render(<DemoForm />)
    await userEvent.type(screen.getByLabelText('Project name'), 'my project')
    await userEvent.click(screen.getByRole('button', { name: 'Save' }))
    expect(await screen.findByText('Saved')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
