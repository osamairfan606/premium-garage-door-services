/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_FORM_ENDPOINT?: string;
}
interface ImportMeta { readonly env: ImportMetaEnv }

declare module 'virtual:blog-posts' {
  /** Post metadata (and, in the SSR build only, `html`). See vite-plugin-blog.ts. */
  export const posts: unknown[];
  export const loaders: Record<string, () => Promise<string>>;
}
