/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CALENDLY_DEMO_URL?: string;
  /** Optional full-bleed hero MP4; overrides default photograph. */
  readonly VITE_HERO_VIDEO_URL?: string;
  /** Optional hero still (root-relative or absolute URL). Default /hero-soc.png. */
  readonly VITE_HERO_IMAGE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
