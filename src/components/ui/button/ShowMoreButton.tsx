import { Button } from '@/components/ui/shadcn/button'

export default function ShowMoreButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button variant={'outline'} onClick={onClick}>
      Mostrar Todos
    </Button>
  )
}
