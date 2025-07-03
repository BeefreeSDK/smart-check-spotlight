import axios, { AxiosResponse } from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import { SmartCheckRequest, SmartCheckResponse } from './types'

export const POST = async (request: NextRequest) => {
  try {
    const { template, checks } = await request.json()
    const response = await axios.post<undefined, AxiosResponse<SmartCheckResponse>, SmartCheckRequest>(
      process.env.NEXT_PUBLIC_CONTENT_SERVICE_API, {
        template,
        checks,
      }, { 
        headers: { "Authorization": `Bearer ${process.env.CONTENT_SERVICE_API_SECRET}` }
      }
    )
    return NextResponse.json(response.data)
  } catch (error: unknown) {
    return NextResponse.json(
      { error: 'An unexpected error occurred', data: (error as Error).message },
      { status: 500 },
    )
  }
}
