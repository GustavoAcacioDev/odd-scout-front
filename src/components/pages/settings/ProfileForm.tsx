"use client";

import InputDefault from "@/components/ui/input/InputDefault";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/shadcn/card";
import { Form } from "@/components/ui/shadcn/form";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { useForm } from "react-hook-form";

export default function ProfileForm() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  return (
    <Card className="h-auto">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InputDefault form={form} name="firstName" label="First Name" />
            <InputDefault form={form} name="lastName" label="Last Name" />
            <InputDefault form={form} name="email" label="Email" />
            <InputDefault form={form} name="phone" label="Phone Number" />
            <Button>Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
