export interface ApiResponse<T> {
  value: T
  isSuccess: boolean
  hasWarnings: boolean
  errors: string[]
  warnings: string[]
}

export interface ApiResponseList<T> {
  total: number
  pageIndex: number
  items: T[]
  isSuccess: boolean
  hasWarnings: boolean
  errors: string[]
  warnings: string[]
}

type Prev = [never, 0, 1, 2, 3, 4, 5]

export type NestedKeys<T, Depth extends number = 5> = Depth extends 0
  ? never
  : {
      [K in keyof T]: T[K] extends object
        ? `${K & string}.${NestedKeys<T[K], Prev[Depth]>}`
        : `${K & string}`
    }[keyof T]
