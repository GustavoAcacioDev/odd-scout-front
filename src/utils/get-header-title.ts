export const i18nRouteTitles = new Map<string, string>([
  ['dashboard', 'Dashboard'],
  ['bets', 'Open Bets'],
])

export function getHeaderTitle(pathname: string) {
  const splitPath = pathname.split('/')
  const trimPathArray = splitPath.slice(1)
  const arrayLength = trimPathArray.length
  const targetRoute = trimPathArray[arrayLength - 1]

  const titleLink = i18nRouteTitles.get(targetRoute)

  return {
    isLink: arrayLength > 2,
    title: titleLink,
  }
}
