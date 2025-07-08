'use client'
import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../shadcn/form'
import { Input } from '../shadcn/input'

const InputPassword = <TFieldValues extends FieldValues = FieldValues>({
  name,
  placeholder = 'Digite aqui',
  form,
  label,
  disabled,
  required,
}: {
  name: Path<TFieldValues>
  placeholder?: string
  form: UseFormReturn<TFieldValues>
  disabled?: boolean
  label?: string
  required?: boolean
}) => {
  const [show, setShow] = useState(false)

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="relative">
          {label && (
            <div className="flex w-full items-center justify-between">
              <FormLabel>{label}</FormLabel>
            </div>
          )}

          <FormControl>
            <div className="relative">
              <span className="absolute right-0 bottom-3 flex items-center px-4 hover:cursor-pointer">
                {!show ? (
                  <EyeOff
                    className="text-gray-700"
                    size={20}
                    onClick={() => setShow(!show)}
                  />
                ) : (
                  <Eye
                    size={20}
                    className="text-gray-700"
                    onClick={() => setShow(!show)}
                  />
                )}
              </span>

              <Input
                {...field}
                disabled={disabled}
                required={required}
                type={show ? 'text' : 'password'}
                placeholder={placeholder}
                className="w-full rounded-md"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default InputPassword
