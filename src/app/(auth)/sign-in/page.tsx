import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { OddScoutLogo } from '@/assets/svg'
import AuthCard from '@/components/pages/auth/AuthCard'
import SigninForm from '@/components/pages/auth/SignIn/SigninForm'

export default function SignInPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <AuthCard>
        <div className="">
          <Link href="/" className="flex items-center md:h-[81px] md:w-[145px]">
            <Image
              src={OddScoutLogo}
              alt=""
              className="object-cover object-center"
              width={145}
              height={81}
              priority
              loading="eager"
            />
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-800">
            Bem vindo de volta!
          </h1>
          <p className="text-base font-semibold text-gray-700">
            Entre na sua conta para continuar
          </p>
        </div>

        <SigninForm />
      </AuthCard>
    </div>
  )
}
