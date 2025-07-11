import axios, { AxiosError } from "axios"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
  try {
    const { template_type } = await request.json()
    const uid = request.headers.get("uid")

    if (!uid) {
      return NextResponse.json({ error: "uid is missing" }, { status: 401 })
    }
    if (typeof uid !== "string") {
      return NextResponse.json(
        { error: "uid must be of string type" },
        { status: 401 }
      )
    }
    if (!template_type) {
      return NextResponse.json(
        { error: "template_type is missing" },
        { status: 401 }
      )
    }
    if (!["email", "page"].includes(template_type)) {
      return NextResponse.json(
        { error: "template_type must be either email or page" },
        { status: 401 }
      )
    }

    const response = await axios.post(
      process.env.NEXT_PUBLIC_BEEPLUGIN_AUTH_ENDPOINT,
      {
        uid,
        client_id: process.env.BEEPLUGIN_AUTH_EMAIL_CLIENT_ID,
        client_secret: process.env.BEEPLUGIN_AUTH_EMAIL_CLIENT_SECRET
      }
    )

    return NextResponse.json(response.data)
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      const status = axiosError.response?.status ?? 500
      const data = axiosError.response?.data ?? {
        error: "Unknown error from server"
      }
      return NextResponse.json(data, { status })
    }

    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        message: (error as Error).message
      },
      { status: 500 }
    )
  }
}
