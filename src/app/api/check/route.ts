import axios, { AxiosError, AxiosResponse } from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import { CheckAPIRequest, CheckAPIResponse } from './types'

export const POST = async (request: NextRequest) => {
  try {
    const { template, checks } = await request.json()

    const response = await axios.post<CheckAPIResponse, AxiosResponse<CheckAPIResponse>, CheckAPIRequest>(
      process.env.NEXT_PUBLIC_CONTENT_SERVICE_API,
      {
        template,
        checks,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CONTENT_SERVICE_API_SECRET}`,
        },
      }
    )

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
