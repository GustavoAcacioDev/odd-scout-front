import { twMerge } from 'tailwind-merge'

interface ITableFilterContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export default function TableFilterContainer({
  children,
  ...props
}: ITableFilterContainerProps) {
  return (
    <div
      className={twMerge(
        'tablet:mb-0 tablet:pr-1 mb-4 flex gap-4 pt-2',
        props.className,
      )}
    >
      {children}
    </div>
  )
}
