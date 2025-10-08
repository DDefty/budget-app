import 'dotenv/config'

const bool = (v: string | undefined, def = false) =>
  v === undefined ? def : v.toLowerCase() === 'true'

export const env = {
  PORT: Number(process.env.PORT ?? 4000),
  WEB_ORIGIN: process.env.WEB_ORIGIN ?? 'http://localhost:5173',

  JWT_SECRET: process.env.JWT_SECRET ?? '',
  COOKIE_NAME: process.env.COOKIE_NAME ?? 'token',
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || undefined,
  COOKIE_SECURE: bool(process.env.COOKIE_SECURE, false),
}

if (!env.JWT_SECRET) {
  console.warn('[auth] Missing JWT_SECRET in .env')
}
