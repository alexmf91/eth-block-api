declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string
      APP_NAME: string
      PORT: string
      RPC_URL: string
    }
  }
}

export {}