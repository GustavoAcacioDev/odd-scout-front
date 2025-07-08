import { TLogReq } from '@/app/api/route'

export async function createLog(data: TLogReq) {
  try {
    const res = await fetch(`/api/log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      console.error('Failed to create log at', data.component)
    }

    const resData = await res.json().catch(() => {})

    return resData
  } catch (error) {
    console.log('error creating log', error)
  }
}
