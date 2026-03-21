/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CALENDLY_DEMO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
