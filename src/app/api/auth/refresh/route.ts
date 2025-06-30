import { getJwtToken } from '@/helpers/auth-utils'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

// call bee-auth to refresh
export const POST = async (request: NextRequest) => {
  const token = getJwtToken(request.headers)

  return axios.post(process.env.BEEPLUGIN_AUTH_REFRESH, { token })
    .then(response => NextResponse.json(response.data))
    .catch(error => NextResponse.json(
      { error: error.message, data: error.response.data ?? error.response.statusText },
      { status: error.response.status },
    ))
}
