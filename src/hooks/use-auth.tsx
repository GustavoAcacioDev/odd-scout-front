import { XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

import { toast } from '@/components/ui/shadcn/use-toast'
import { useSetterLoadingContext } from '@/contexts/LoadingContext'
import { TLoginUserBody } from '@/types/auth'

export default function useAuth() {
  const router = useRouter()
  const { endLoading } = useSetterLoadingContext()

  async function authWithNextAuth(data: TLoginUserBody) {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (res?.ok) {
      return router.push('/dashboard')
    }

    if (res?.status === 403) {
      return router.push('/blocked-access')
    }

    if (res?.status === 401) {
      toast({
        action: (
          <div className="bg-negative-pure w-fit rounded-full p-1">
            <XCircle className="tablet:h-10 tablet:w-10 h-6 w-6 text-white" />
          </div>
        ),
        variant: 'danger',
        title: 'Algo deu errado.',
        description: 'Usuário ou senha inválidos.',
      })

      endLoading()
      return
    }

    toast({
      action: (
        <div className="bg-negative-pure w-fit rounded-full p-1">
          <XCircle className="tablet:h-10 tablet:w-10 h-6 w-6 text-white" />
        </div>
      ),
      variant: 'danger',
      title: 'Algo deu errado.',
      description: res?.error || 'Tivemos um problema na autenticação.',
    })

    endLoading()
  }

  return { authWithNextAuth }
}
