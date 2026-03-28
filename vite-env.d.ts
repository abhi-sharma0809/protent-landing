/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CALENDLY_DEMO_URL?: string;
  /** Optional full-bleed hero (e.g. operator at a multi-monitor wall). Uses stream wall if unset. */
  readonly VITE_HERO_VIDEO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
