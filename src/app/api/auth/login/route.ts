import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

// call bee-auth to login
export const POST = async (request: NextRequest) => {
  const { template_type } = await request.json()
  const uid = request.headers.get('uid')

  if (!uid) {
    return NextResponse.json({ error: 'uid is missing' }, { status: 401 })
  }
  if (typeof uid !== 'string') {
    return NextResponse.json({ error: 'uid must be of string type' }, { status: 401 })
  }
  if (!template_type) {
    return NextResponse.json({ error: 'template_type is missing' }, { status: 401 })
  }
  if (!['email', 'page'].includes(template_type)) {
    return NextResponse.json({ error: 'template_type must be either email or page' }, { status: 401 })
  }

  return axios.post(process.env.NEXT_PUBLIC_BEEPLUGIN_AUTH_ENDPOINT, {
    uid,
    client_id: template_type === 'email' ? process.env.BEEPLUGIN_AUTH_EMAIL_CLIENT_ID : process.env.BEEPLUGIN_AUTH_PAGE_CLIENT_ID,
    client_secret: template_type === 'email' ? process.env.BEEPLUGIN_AUTH_EMAIL_CLIENT_SECRET : process.env.BEEPLUGIN_AUTH_PAGE_CLIENT_SECRET,
  })
    .then(response => NextResponse.json(response.data))
    .catch(error => NextResponse.json(
      { error: error.message, data: error.response.data ?? error.response.statusText },
      { status: error.response.status },
    ))
}
