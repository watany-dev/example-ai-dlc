import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'

const demoSchema = z.object({
  projectName: z.string().min(3, 'Project name must be at least 3 characters'),
})

type DemoValues = z.infer<typeof demoSchema>

export function DemoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<DemoValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: { projectName: '' },
  })

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(() => {})}
      noValidate
    >
      <h2 className="font-medium text-lg">Demo form</h2>
      <label htmlFor="projectName">Project name</label>
      <input
        id="projectName"
        className="rounded-md border px-3 py-2"
        {...register('projectName')}
      />
      {errors.projectName && (
        <p role="alert" className="text-destructive text-sm">
          {errors.projectName.message}
        </p>
      )}
      {isSubmitSuccessful && (
        <p className="text-muted-foreground text-sm">Saved</p>
      )}
      <Button type="submit" className="self-start">
        Save
      </Button>
    </form>
  )
}
