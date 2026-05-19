import { useQuery } from '@tanstack/react-query'
import { Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fetchHealth } from '@/lib/api/health'
import { formatHealthLabel } from '@/lib/format'

export function HealthStatus() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
  })

  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-medium text-lg">Backend health</h2>
      {isPending && <p className="text-muted-foreground">Checking…</p>}
      {isError && (
        <p role="alert" className="text-destructive">
          Unavailable
        </p>
      )}
      {data && (
        <p className="flex items-center gap-2">
          <Activity aria-hidden="true" />
          {formatHealthLabel(data.status)}
        </p>
      )}
      <Button
        type="button"
        variant="outline"
        className="self-start"
        onClick={() => refetch()}
      >
        Refresh
      </Button>
    </section>
  )
}
