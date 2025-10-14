import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { env } from './lib/env'
import { auth } from './modules/auth/router'
import { transaction } from './modules/transaction/router'

export const app = express()

app.use(helmet())
app.use(cors({ origin: env.WEB_ORIGIN, credentials: true }))
app.use(cookieParser())
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

app.get('/healthz', (_req, res) => res.json({ ok: true }))

app.use('/auth', auth)
app.use('', transaction);

app.listen(env.PORT, () => {
  console.log(`[api] up on http://localhost:${env.PORT}`)
})
