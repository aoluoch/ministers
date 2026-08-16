/** Runtime site origin: `VITE_SITE_URL` in production, current origin in dev. */
import { DEFAULT_SITE_URL, normalizeSiteUrl } from './pages'

export const SITE_URL = normalizeSiteUrl(
  import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL,
)
