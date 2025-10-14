import request from 'supertest'
import { app } from '../../server'
import { genAuthData } from '../../utils/genAuthData';

process.env.COOKIE_NAME ??= 'token'

let testUser: { email: string; password: string };

describe('POST /auth/login', () => {
    beforeEach(async () => {
        const { name, email, password } = genAuthData.inRange();
        await request(app).post('/auth/register').send({ name, email, password, confirmPassword: password })
        testUser = { email, password }
    })

    it('should return 200 for valid credentials', async () => {
        const res = await request(app).post('/auth/login').send(testUser)
        expect(res.status).toBe(200)
        expect(res.headers['set-cookie']).toBeDefined()
    })

    it('should return 400 for invalid email format', async () => {
        const email = 'abc@';
        const res = await request(app).post('/auth/login').send({ email, password: testUser.password })
        expect(res.status).toBe(400);
        expect(res.body.issues[0].message).toBe('Invalid email address');
        expect(res.headers['set-cookie']).toBeUndefined()
    })

    it('should return 400 for email field empty', async () => {
        const res = await request(app).post('/auth/login').send({ password: testUser.password })
        expect(res.status).toBe(400);
        expect(res.body.issues[0].message).toBe('Invalid input: expected string, received undefined');
        expect(res.headers['set-cookie']).toBeUndefined()
    })

    it('should return 400 for password field empty', async () => {
        const res = await request(app).post('/auth/login').send({ email: testUser.email })
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Invalid payload');
        expect(res.headers['set-cookie']).toBeUndefined()
    })

    it('should return 401 for email that does not exist', async () => {
        const { email, password } = genAuthData.inRange();
        const res = await request(app).post('/auth/login').send({ email, password})
        expect(res.status).toBe(401);
        expect(res.body.error).toBe('Invalid email or password');
        expect(res.headers['set-cookie']).toBeUndefined()
    })

    it('should return 404 for wrong method', async () => {
        const res = await request(app).get('/auth/login').send(testUser)
        expect(res.status).toBe(404);
        expect(res.headers['set-cookie']).toBeUndefined()
    })

})