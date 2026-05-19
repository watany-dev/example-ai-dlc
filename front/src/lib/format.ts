export function formatHealthLabel(status: string): string {
  return status.trim().toLowerCase() === 'ok' ? 'Operational' : 'Degraded'
}
