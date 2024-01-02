const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const deployedApp = 'https://create-notes-backend.onrender.com'; // Express App
const app = 'http://localhost:5000';

dotenv.config();

beforeEach(async () => {
    await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
    await mongoose.connection.close();
});

// just change email before testing
const email = 'adityatest1@gmail.com'

describe('Signup Endpoint', () => {
    test('Should create a new user', async () => {
        const res = await request(app)
            .post('/user/signup')
            .send({
                email,
                password: 'testpassword',
                name: 'Test'
            })
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe('Test');
        expect(res.body.token).toBeDefined();
    });

    test('Should return user exist\'s message', async () => {
        const res = await request(app)
            .post('/user/signup')
            .send({
                email,
                password: 'testpassword',
                name: 'Test User'
            })
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('User already exist\'s');
    })
});

describe('Login Endpoint', () => {
    test('should login existing user', async () => {
        const res = await request(app)
            .post('/user/login')
            .send({
                email,
                password: 'testpassword',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.result).toBe('Test');
        expect(res.body.token).toBeDefined();
    });

    test('should return user not found', async () => {
        const res = await request(app)
            .post('/user/login')
            .send({
                email: 'testemail_1@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe('User don\'t exist');
    });

    test('should return invalid credentials', async () => {
        const res = await request(app)
            .post('/user/login')
            .send({
                email,
                password: 'wrongpassword'
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Invalid credentials');
    });
});