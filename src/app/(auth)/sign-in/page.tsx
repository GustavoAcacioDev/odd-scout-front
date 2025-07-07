import React from "react";

import AuthCard from "@/components/pages/auth/AuthCard";
import SigninForm from "@/components/pages/auth/SignIn/SigninForm";
import Link from "next/link";
import Image from "next/image";
import { OddScoutLogo } from "@/assets/svg";

export default function SignInPage() {
  return (
    <div className="w-full flex flex-col gap-6 items-center justify-center">
      <AuthCard>
        <div className=""><Link
          href="/"
          className="flex items-center tablet:h-[81px] tablet:w-[145px]"
        >
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
  );
}
