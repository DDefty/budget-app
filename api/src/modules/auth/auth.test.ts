import request from 'supertest'
import { app } from '../../server'

vi.mock('../lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}))

vi.mock('bcrypt', () => ({
  default: { hash: vi.fn() },
}))

describe('POST /auth/register', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return 400 for invalid payload', async () => {
    const res = await request(app).post('/auth/register').send({ email: 'bad@' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBe('Invalid payload')
  })
})