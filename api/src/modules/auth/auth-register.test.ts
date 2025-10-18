import request from 'supertest'
import { app } from '../../server'
import { genAuthData } from '../../utils/genAuthData';

process.env.COOKIE_NAME ??= 'token'

describe('POST /auth/register', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return 400 for invalid payload', async () => {
        const res = await request(app).post('/auth/register').send({ email: 'bad@' })
        expect(res.status).toBe(400)
        expect(res.body.error).toBe('Invalid payload')
    })

    it('should return 201 for valid data', async () => {
        const { name, email, password } = genAuthData.inRange();

        const res = await request(app).post('/auth/register').send({ name, email, password, confirmPassword: password })
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('id')
        expect(typeof res.body.id).toBe('string')
        expect(res.body).toMatchObject({ name, email })
        expect(res.headers['set-cookie']).toBeDefined()
        expect(res.headers['set-cookie'][0]).toContain(process.env.COOKIE_NAME)
    })

    it('should return 400 for request without name', async () => {
        const { email, password } = genAuthData.inRange();

        const res = await request(app).post('/auth/register').send({ email, password, confirmPassword: password })
        expect(res.status).toBe(400)
        expect(res.body.error).toBe('Invalid payload')
    })

    it('should return 400 if password < 8 chars', async () => {
        const { name, email } = genAuthData.inRange();
        const { password } = genAuthData.belowMin();

        const res = await request(app).post('/auth/register').send({ name, email, password, confirmPassword: password })
        expect(res.status).toBe(400)
        expect(res.body.error).toBe('Invalid payload')
        expect(res.body.issues[0].message).toBe('Too small: expected string to have >=8 characters')
    })

    it('should return 401 if passwords does not match', async () => {
        const { name, email, password, diffPass } = genAuthData.inRange();


        const res = await request(app).post('/auth/register').send({ name, email, password, confirmPassword: diffPass })
        expect(res.status).toBe(401)
        expect(res.body.error).toBe(`Passwords don't match`)
    })

    it('should return 409 if email is already registered', async () => {
        const { name, email, password } = genAuthData.inRange();

        const first = await request(app).post('/auth/register').send({ name, email, password, confirmPassword: password })
        expect(first.status).toBe(201)
        expect(first.body).toHaveProperty('id')
        expect(typeof first.body.id).toBe('string')
        expect(first.body).toMatchObject({ name, email })
        expect(first.headers['set-cookie']).toBeDefined()
        expect(first.headers['set-cookie'][0]).toContain(process.env.COOKIE_NAME)

        const sec = await request(app).post('/auth/register').send({ name, email, password, confirmPassword: password });
        expect(sec.status).toBe(409)
        expect(sec.body.error).toBe(`Email already registered`)
    })

    it('should return 201 for fields at max length', async () => {
        const { name, email, password } = genAuthData.max();

        const res = await request(app).post('/auth/register').send({ name, email, password, confirmPassword: password })
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('id')
        expect(typeof res.body.id).toBe('string')
        expect(res.body).toMatchObject({ name, email })
        expect(res.headers['set-cookie']).toBeDefined()
        expect(res.headers['set-cookie'][0]).toContain(process.env.COOKIE_NAME)
    })

    it('should return 400 for fields just above max length', async () => {
        const { name, email, password } = genAuthData.aboveMax();

        const res = await request(app).post('/auth/register').send({ name, email, password, confirmPassword: password })
        expect(res.status).toBe(400)
        expect(res.body.issues[0]).toEqual(
            expect.objectContaining({
                message: expect.stringContaining('Too big'),
            })
        )
    })
})