"use client";
import InputPassword from "@/components/ui/input/InputPassword";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Form } from "@/components/ui/shadcn/form";
import { validationText } from "@/config/validation-text";
import { useFormSubmitHandler } from "@/hooks/use-form-submit-handler";
import { changePassword } from "@/services/settings/settings-service-client";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const { requiredError, maxCharacters, minValue } = validationText.zod;

const securitySchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: minValue(6) })
      .max(50, { message: maxCharacters(50) }),
    newPassword: z
      .string()
      .min(6, { message: minValue(6) })
      .max(50, { message: maxCharacters(50) }),
    confirmPassword: z
      .string()
      .min(1, { message: requiredError })
      .max(50, { message: maxCharacters(50) }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "The password don't match.",
    path: ["newPassword"],
  });

type TSecuritySchema = z.infer<typeof securitySchema>;

export default function SecurityForm() {
  const { onSubmitHandler } = useFormSubmitHandler();

  const form = useForm<TSecuritySchema>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit } = form;

  async function onSubmit(data: TSecuritySchema) {
    await onSubmitHandler({
      data,
      service: changePassword,
      options: {
        onSuccessMessage: {
          title: "Senha alterada!",
          message: "Sua senha foi alterada com sucesso.",
        },
        onCatchMessage: {
          logService: {
            block: "Catch of onSubmit",
            component: "SecurityForm",
          },
          log: {
            path: "settings > security form > onSubmit",
          },
        },
      },
    });
  }

  return (
    <Card className="h-auto">
      <CardHeader>
        <CardTitle>Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <InputPassword
              form={form}
              name="currentPassword"
              label="Current Password"
            />
            <InputPassword
              form={form}
              name="newPassword"
              label="New Password"
            />
            <InputPassword
              form={form}
              name="confirmPassword"
              label="Confirm New Password"
            />

            <Button type="submit">Update Password</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
