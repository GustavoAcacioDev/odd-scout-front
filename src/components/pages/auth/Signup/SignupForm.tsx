"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import InputDefault from "@/components/ui/input/InputDefault";
import InputPassword from "@/components/ui/input/InputPassword";
import { Button } from "@/components/ui/shadcn/button";
import { Form } from "@/components/ui/shadcn/form";
import { validationText } from "@/config/validation-text";
import useAuth from "@/hooks/use-auth";
import { createLog } from "@/services/general/log-service-client";
import { registerUserClient } from "@/services/auth/auth-service-client";

const { requiredError, maxCharacters, invalidEmail, minValue } = validationText.zod;

const SignUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: requiredError })
    .max(50, { message: maxCharacters(50) }),
  email: z
    .string()
    .email(invalidEmail)
    .min(1, { message: requiredError })
    .max(200, { message: maxCharacters(200) }),
  password: z
    .string()
    .min(6, { message: minValue(6) })
    .max(50, { message: maxCharacters(50) }),
  confirmPassword: z
    .string()
    .min(1, { message: requiredError })
    .max(50, { message: maxCharacters(50) }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type TSignUpSchema = z.infer<typeof SignUpSchema>;

export default function SignupForm() {
  const { authWithNextAuth } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit } = form;

  async function onSubmit(data: TSignUpSchema) {
    setIsLoading(true);

    try {
      const signupResponse = await registerUserClient(data);

      if (!signupResponse.isSuccess) {
        throw new Error(signupResponse.errors[0]);
      }

      await authWithNextAuth({
        email: data.email,
        password: data.password,
      });

    } catch (error) {
      console.log("error on signUp onSubmit", error);
      const { message } = error as Error;

      if (message === "403") {
        return router.push("/blocked-access");
      }

      if (error) {
        createLog({
          block: "Catch",
          component: "SignUp Form",
          error: message,
          route: "/sign-up",
        });
      }

      console.error("Erro no cadastro:", message);

      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        id="signup-form"
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2">
          <InputDefault form={form} name="name" label="Nome" />

          <InputDefault form={form} name="email" label="Endereço de E-mail" />

          <InputPassword form={form} name="password" label="Senha" />

          <InputPassword form={form} name="confirmPassword" label="Confirme sua Senha" />
        </div>

        <Button
          variant="default"
          className="w-full"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Criando conta..." : "Finalizar Cadastro"}
        </Button>

        <Button
          variant="outline"
          className="w-full"
          type="button"
          asChild
        >
          <Link href="/sign-in">Cancelar</Link>
        </Button>

        <span className="w-full inline-block text-center text-xs font-semibold text-gray-400">
          © 2025 OddScout. Todos os direitos reservados.
        </span>
      </form>
    </Form>
  );
}