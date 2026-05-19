import { DemoForm } from '@/components/DemoForm'
import { HealthStatus } from '@/components/HealthStatus'

export default function App() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 p-8">
      <header className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">example-ai-dlc</h1>
        <p className="text-muted-foreground">
          ビジネスのプロジェクト管理・監視・可視化エージェントシステム。 UI
          はこのハーネスを起点に、Kiro CLI の spec 駆動開発で実装します。
        </p>
      </header>
      <HealthStatus />
      <DemoForm />
    </main>
  )
}
