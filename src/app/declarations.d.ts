declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BEEPLUGIN_AUTH_ENDPOINT: string
      NEXT_PUBLIC_BEEPLUGIN_AUTH_REFRESH: string
      NEXT_PUBLIC_CONTENT_SERVICE_API: string
      BEEPLUGIN_AUTH_VERIFY: string
      BEEPLUGIN_AUTH_EMAIL_CLIENT_ID: string
      BEEPLUGIN_AUTH_EMAIL_CLIENT_SECRET: string
      CONTENT_SERVICE_API_SECRET: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
// eslint-disable-next-line prettier/prettier
export { }
