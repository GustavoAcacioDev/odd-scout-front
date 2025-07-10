// Desc: Table configuration file

// Items per page options
export const pageSizeOptions = ['5', '10', '20'] as const

// Type for items per page options
export type TPageSizeOptions = (typeof pageSizeOptions)[number]

// Initial items per page
export const INITIAL_PAGE_SIZE: TPageSizeOptions = '10'
export const MOBILE_INITIAL_PAGE_SIZE: TPageSizeOptions = '5'
