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
      // Removes template json
      const data = { ...response.data }
      delete data.json_data
      return NextResponse.json(data)
    })
    .catch(error => NextResponse.json(error.response.data, error.response))
}
