declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASEPATH: string
      NEXT_PUBLIC_BEEPLUGIN_URL: string
      NEXT_PUBLIC_BEEPLUGIN_AUTH_ENDPOINT: string
      BEEPLUGIN_AUTH_VERIFY: string
      BEEPLUGIN_AUTH_REFRESH: string
      NEXT_PUBLIC_BEEPRO_ENDPOINT: string
      NEXT_PUBLIC_BEEPRO_ACCESS_TOKEN_NAME: string
      NEXT_PUBLIC_BEEPRO_REFRESH_TOKEN_NAME: string
      BEEPLUGIN_AUTH_EMAIL_CLIENT_ID: string
      BEEPLUGIN_AUTH_EMAIL_CLIENT_SECRET: string
      BEEPLUGIN_AUTH_PAGE_CLIENT_ID: string
      BEEPLUGIN_AUTH_PAGE_CLIENT_SECRET: string
      TEMPLATE_CATALOG_ENDPOINT: string
      TEMPLATE_CATALOG_API_KEY: string
      TEMPLATE_CATALOG_VERSION: string
      DEBUG_ACCESS_TOKEN: string
      WEBFLOW_SITE_ID: string
      WEBFLOW_AUTH_TOKEN: string
      NEXT_PUBLIC_BEEFREE_ACCESS_TOKEN_NAME: string
      NEXT_PUBLIC_BEEFREE_UID: string
      NEXT_PUBLIC_BEEFREE_UID_PREFIX: string
      NEXT_PUBLIC_GTM_ID: string
      NEXT_PUBLIC_MATOMO_ID: string
      NEXT_PUBLIC_MATOMO_URL: string
      NEXT_PUBLIC_CIO_ANALYTICS_WRITE_KEY: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
