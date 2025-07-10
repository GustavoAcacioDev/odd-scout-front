import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface ITableFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export default function TableFooter({
  children,
  className,
  ...props
}: ITableFooterProps) {
  return (
    <div
      {...props}
      className={twMerge('mt-4 flex items-center gap-2', className)}
    >
      {children}
    </div>
  )
}
