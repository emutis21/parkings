import { useRouter } from 'next/navigation'

export function useDeleteEntity({
  idEntity,
  deleteEntity
}: {
  idEntity: string
  deleteEntity: (id: string) => Promise<string>
}) {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      await deleteEntity(idEntity)

      router.refresh()
      router.back()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  return handleDelete
}
