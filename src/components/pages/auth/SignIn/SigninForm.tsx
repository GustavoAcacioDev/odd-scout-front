"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { GoogleLogo } from "@/assets/svg";
import InputDefault from "@/components/ui/input/InputDefault";
import InputPassword from "@/components/ui/input/InputPassword";
import { Button } from "@/components/ui/shadcn/button";
import { Form } from "@/components/ui/shadcn/form";
import { Separator } from "@/components/ui/shadcn/separator";
import { validationText } from "@/config/validation-text";
import useAuth from "@/hooks/use-auth";
import { createLog } from "@/services/general/log-service-client";

const { requiredError, maxCharacters, invalidEmail } = validationText.zod;

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
});

type TSignInSchema = z.infer<typeof SignInSchema>;

function SigninForm() {
  const { authWithNextAuth } = useAuth();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = form;

  async function onSubmit(data: TSignInSchema) {
    try {
      await authWithNextAuth(data);
    } catch (error) {
      console.log("error on signIn onSubmit", error);
      const { message } = error as Error;

      if (message === "403") return router.push("/blocked-access");

      if (error) {
        createLog({
          block: "Catch",
          component: "SignIn Form",
          error: message,
          route: "/sign-in",
        });
      }
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
            className="inline-block text-sm w-full text-end text-blue font-medium hover:underline"
          >
            Esqueceu sua senha?
          </Link>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <Button
            variant="outline"
            className="w-full"
            type="submit"
            form="signin-form"
          >
            Entrar na Conta
          </Button>

          <div className="w-full flex items-center gap-4">
            <Separator className="shrink" />
            <span className="font-semibold text-gray-600">OU</span>
            <Separator className="shrink" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full flex gap-2 items-center"
            onClick={() => alert("Função não implementada")}
          >
            <Image
              src={GoogleLogo}
              alt="G representando o logo do Google"
              height={16}
            />{" "}
            Continuar com Google
          </Button>

          <div className="w-full flex items-center gap-4">
            <Separator className="shrink" />
            <span className="w-full text-center text-sm font-semibold text-gray-600 text-nowrap">Ainda não tem uma conta?</span>
            <Separator className="shrink" />
          </div>

          <Button
            variant="default"
            className="w-full"
            type="button"
            asChild
          >
            <Link href="/sign-up">Cadastre-se Agora</Link>
          </Button>
        </div>

        <span className="w-full inline-block text-center text-xs font-semibold text-gray-400">
          © 2025 OddScout. Todos os direitos reservados.
        </span>
      </form>
    </Form>
  );
}

export default SigninForm;
