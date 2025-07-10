import React from 'react'

import AuthCard from '@/components/pages/auth/AuthCard'
import SignupForm from '@/components/pages/auth/Signup/SignupForm'

export default function SignUpPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6">
      <AuthCard>
        <div className="">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Seja bem vindo!
          </h1>
          <p className="text-base font-semibold text-gray-700">
            Crie uma conta para começar a usar o OddScout
          </p>
        </div>

        <SignupForm />
      </AuthCard>
    </div>
  )
}
