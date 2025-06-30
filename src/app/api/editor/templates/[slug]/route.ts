import { templateCatalogAxiosInstance } from '@/helpers/axios'
import { NextRequest, NextResponse } from 'next/server'

type Options = {
  params: {
    slug: string
  }
}

export const GET = async (_: NextRequest, { params: { slug } }: Options) => {
  return templateCatalogAxiosInstance.get(`templates/${slug}`)
    .then((response) => {
      return NextResponse.json(response.data)
    })
    .catch(error => NextResponse.json(error.response.data, error.response))
}
