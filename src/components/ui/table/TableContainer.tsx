import { twMerge } from 'tailwind-merge'

interface TableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function TableContainer({
  children,
  ...props
}: TableContainerProps) {
  return (
    <section
      {...props}
      className={twMerge(
        'grid-rows-table relative grid w-full gap-5 overflow-hidden',
        props.className,
      )}
    >
      {children}
    </section>
  )
}
