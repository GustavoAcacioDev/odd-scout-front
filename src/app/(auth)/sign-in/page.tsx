import React from "react";

import AuthCard from "@/components/pages/auth/AuthCard";
import SigninForm from "@/components/pages/auth/SignIn/SigninForm";

export default function SignInPage() {
  return (
    <div className="w-full flex flex-col gap-6 items-center justify-center">
      <AuthCard>
        <div className="">
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
  );
}
