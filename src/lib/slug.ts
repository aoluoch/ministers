/**
 * Slug helper shared by the Contentful mappers and the build-time SEO tooling
 * (`seo/plugin.ts`), so sitemap URLs always match the URLs the router serves.
 *
 * Imported by `vite.config.ts` tooling: keep it dependency-free and DOM-free,
 * and use relative imports only (the `@/` alias is not available there).
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
