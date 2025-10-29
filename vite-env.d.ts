/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_GOOGLE_OAUTH_CLIENT_ID: string
  readonly VITE_GOOGLE_OAUTH_CLIENT_SECRET: string
  readonly VITE_GITHUB_OAUTH_CLIENT_ID: string
  readonly VITE_GITHUB_OAUTH_CLIENT_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}