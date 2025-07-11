import axios, { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  try {
    const authHeader = String(request.headers.get('Authorization') ?? '')
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7, authHeader.length) : null
    const response = await axios.post(process.env.NEXT_PUBLIC_BEEPLUGIN_AUTH_REFRESH, { token })
    return NextResponse.json(response.data)
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      const status = axiosError.response?.status ?? 500
      const data = axiosError.response?.data ?? { error: 'Unknown error from server' }
      return NextResponse.json(data, { status })
    }
    return NextResponse.json(
      { error: 'An unexpected error occurred', message: (error as Error).message },
      { status: 500 }
    )
  }
}
