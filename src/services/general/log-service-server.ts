import { headers } from 'next/headers'

import { TLogReq } from '@/app/api/route'

export async function createLogServer(data: TLogReq) {
  const headersList = await headers()
  const origin = headersList.get('x-forwarded-host')
  const proto = headersList.get('x-forwarded-proto')

  try {
    if (!origin) return

    const endpoint = proto + '://' + origin + '/api/log'

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: origin as string,
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      console.error('Failed to create log at', data.component)
    }

    const resData = await res.json().catch(() => {})

    return resData
  } catch (error) {
    console.error('Error creating log on server', error)
  }
}
