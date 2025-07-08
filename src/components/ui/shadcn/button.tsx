import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center box-border justify-center h-10 whitespace-nowrap cursor-pointer rounded-md text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-[1px] focus-visible:ring-gray-800 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white font-bold hover:bg-primary/80',
        action:
          'bg-positive-md text-white text-sm leading-sm font-bold hover:bg-positive-md-800 hover:outline hover:outline-gray-800 hover:outline-1 ',
        'action-blue':
          'bg-blue text-white text-sm leading-sm font-bold hover:bg-blue-hover hover:outline hover:outline-gray-800 hover:outline-1 ',
        'action-negative':
          'bg-negativePure text-white text-sm leading-sm font-bold hover:bg-negativePure-800 hover:outline hover:outline-gray-800 hover:outline-1 ',
        destructive:
          'bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
        outline:
          'text-sm border-2 bg-transparent leading-sm text-gray-800 font-bold border-gray-300 hover:bg-gray-200 hover:text-gray-900 hover:border-gray-800 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50',
        outlineBlue:
          'border-2 border-blue bg-white text-blue hover:ease-in-out hover:duration-300 hover:bg-blue hover:bg-opacity-10 hover:text-blue',
        'outline-red':
          'border-2 border-negativePure bg-white text-negativePure hover:ease-in-out hover:duration-300 hover:bg-negativePure/10',
        'outline-green':
          'border-2 border-chatmax-green bg-white text-chatmax-green hover:ease-in-out hover:duration-300 hover:bg-chatmax-green/20',
        lightBlue: 'bg-blue/10 text-blue hover:bg-blue hover:text-white',
        fillBlue:
          'bg-blue text-white text-sm leading-sm font-bold hover:bg-blue-hover hover:outline hover:outline-gray-800 hover:outline-1 ',
        fillGray:
          'bg-gray-100 text-gray-800 text-sm leading-sm font-bold hover:bg-blue-20 hover:text-blue hover:outline hover:outline-blue hover:outline-1 ',
        fillGreen:
          'bg-chatmax-green text-white text-sm leading-sm font-bold hover:bg-chatmax-green-dark',
        fillOrange:
          'bg-neutral-orange text-white text-sm leading-sm font-bold hover:outline hover:outline-gray-800 hover:outline-1',
        secondary:
          'bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80',
        ghost:
          'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50',
        link: 'text-slate-900 underline-offset-4 hover:underline dark:text-slate-50',
        transparent:
          'bg-transparent text-white border border-white hover:bg-white hover:text-gray-600',
        communication:
          'bg-neutral-orange text-white font-bold text-sm leading-sm hover:bg-neutral-orange/80',
      },
      size: {
        default: 'h-12 min-h-10 md:h-[48px] rounded-full px-7',
        sm: 'px-8 h-[40px] min-h-10 rounded-full',
        md: 'px-8 h-[48px] min-h-10 rounded-full',
        '2x1': 'leading-[18px] text-[18px] py-[10px] px-8 rounded-2xl ',
        full: 'w-full h-[48px] rounded-full text-gray-800 font-bold max-h-[56px] text-lg leading-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
