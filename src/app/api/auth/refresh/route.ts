import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

// call bee-auth to refresh
export const POST = async (request: NextRequest) => {
  const authHeader = String(request.headers.get('Authorization') ?? '')
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7, authHeader.length) : null
  return axios.post(process.env.NEXT_PUBLIC_BEEPLUGIN_AUTH_REFRESH, { token })
    .then(response => NextResponse.json(response.data))
    .catch(error => NextResponse.json(
      { error: error.message, data: error.response.data ?? error.response.statusText },
      { status: error.response.status },
    ))
}
