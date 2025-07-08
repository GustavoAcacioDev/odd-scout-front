'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { error } from 'console'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { GoogleLogo } from '@/assets/svg'
import InputDefault from '@/components/ui/input/InputDefault'
import InputPassword from '@/components/ui/input/InputPassword'
import { Button } from '@/components/ui/shadcn/button'
import { Form } from '@/components/ui/shadcn/form'
import { Separator } from '@/components/ui/shadcn/separator'
import { validationText } from '@/config/validation-text'
import useAuth from '@/hooks/use-auth'
import { useFormSubmitHandler } from '@/hooks/use-form-submit-handler'
import { createLog } from '@/services/general/log-service-client'

const { requiredError, maxCharacters, invalidEmail } = validationText.zod

const SignInSchema = z.object({
  email: z
    .string()
    .email(invalidEmail)
    .min(1, { message: requiredError })
    .max(200, { message: maxCharacters(200) }),
  password: z
    .string()
    .min(1, { message: requiredError })
    .max(200, { message: maxCharacters(200) }),
})

type TSignInSchema = z.infer<typeof SignInSchema>

function SigninForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { onSubmitHandler } = useFormSubmitHandler()
  const { authWithNextAuth } = useAuth()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit } = form

  async function onSubmit(data: TSignInSchema) {
    setIsLoading(true)

    try {
      await authWithNextAuth(data)
    } catch (error) {
      console.log('error on signIn onSubmit', error)
      const { message } = error as Error

      if (message === '403') return router.push('/blocked-access')

      if (error) {
        createLog({
          block: 'Catch',
          component: 'SignIn Form',
          error: message,
          route: '/sign-in',
        })
      }
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        id="signin-form"
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputDefault form={form} name="email" label="Endereço de E-mail" />

        <div className="w-full">
          <InputPassword form={form} name="password" label="Senha" />
          <Link
            href="/forgot-password"
            className="text-blue inline-block w-full text-end text-sm font-medium hover:underline"
          >
            Esqueceu sua senha?
          </Link>
        </div>

        <div className="flex w-full flex-col gap-4">
          <Button
            type="submit"
            variant="outline"
            className="w-full"
            form="signin-form"
            disabled={isLoading}
          >
            Entrar na Conta
          </Button>

          <div className="flex w-full items-center gap-4">
            <Separator className="shrink" />
            <span className="font-semibold text-gray-600">OU</span>
            <Separator className="shrink" />
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            className="flex w-full items-center gap-2"
            onClick={() => alert('Função não implementada')}
          >
            <Image
              src={GoogleLogo}
              alt="G representando o logo do Google"
              height={16}
            />{' '}
            Continuar com Google
          </Button>

          <div className="flex w-full items-center gap-4">
            <Separator className="shrink" />
            <span className="w-full text-center text-sm font-semibold text-nowrap text-gray-600">
              Ainda não tem uma conta?
            </span>
            <Separator className="shrink" />
          </div>

          <Button
            variant="default"
            disabled={isLoading}
            className="w-full"
            type="button"
            asChild
          >
            <Link href="/sign-up">Cadastre-se Agora</Link>
          </Button>
        </div>

        <span className="inline-block w-full text-center text-xs font-semibold text-gray-400">
          © 2025 OddScout. Todos os direitos reservados.
        </span>
      </form>
    </Form>
  )
}

export default SigninForm
