declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASEPATH: string
      NEXT_PUBLIC_BEEPLUGIN_URL: string
      NEXT_PUBLIC_BEEPLUGIN_AUTH_ENDPOINT: string
      BEEPLUGIN_AUTH_VERIFY: string
      BEEPLUGIN_AUTH_REFRESH: string
      NEXT_PUBLIC_BEEPRO_ENDPOINT: string
      BEEPLUGIN_AUTH_EMAIL_CLIENT_ID: string
      BEEPLUGIN_AUTH_EMAIL_CLIENT_SECRET: string
      NEXT_PUBLIC_BEEFREE_ACCESS_TOKEN_NAME: string
      NEXT_PUBLIC_BEEFREE_UID: string
      NEXT_PUBLIC_BEEFREE_UID_PREFIX: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
