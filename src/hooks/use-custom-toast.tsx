import { XCircle } from 'lucide-react'
import Image from 'next/image'
import { ReactNode } from 'react'

import { toastSuccess } from '@/assets/svg'
import { useToast } from '@/components/ui/shadcn/use-toast'

export default function useCustomToast() {
  const { toast } = useToast()

  function errorToast(title: string, description: ReactNode | undefined) {
    return toast({
      action: (
        <div className="bg-negative-pure w-fit rounded-full p-1">
          <XCircle className="h-10 w-10 text-white md:h-10 md:w-10" />
        </div>
      ),
      variant: 'danger',
      title,
      description: description || 'Tivemos um problema na autenticação.',
    })
  }

  function successToast(title: string, description: ReactNode | undefined) {
    return toast({
      action: (
        <div className="rounded-full bg-white p-1 md:w-fit">
          <Image src={toastSuccess} alt="" />
        </div>
      ),
      variant: 'success',
      title,
      description: description || 'Sua operação foi realizada com sucesso.',
    })
  }

  return { errorToast, successToast }
}
