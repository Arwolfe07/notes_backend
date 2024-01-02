const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = 'http://localhost:5000';
const deployedApp = 'https://create-notes-backend.onrender.com'

dotenv.config();

beforeEach(async () => {
    await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
    await mongoose.connection.close();
})

// generate this token using postman api testing tool when loging in or signing up
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkaXR5YUBnbWFpbC5jb20iLCJpZCI6IjY1OTNiOGM2YTg0ZmIyYjdiZmY4MDg3NSIsImlhdCI6MTcwNDE4NzM3MywiZXhwIjoxNzA0MTkwOTczfQ.MXazBGLV9krZ9ZriheUgotq8ORoZx-PyHEcrb-aYZKA'

describe('Notes routes', () => {
    let newNoteId;
    test('Should get all notes', async () => {
        const res = await request(app)
            .get('/notes/all')
            .set('Authorization', `Bearer ${TOKEN}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    })
    test('Should add a new note', async () => {
        const res = await request(app)
            .post('/notes/add')
            .send({
                title: 'Test Note Here',
                description: 'This is a test note'
            })
            .set('Authorization', `Bearer ${TOKEN}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe('Test Note Here');
        expect(res.body.description).toBe('This is a test note');

        newNoteId = res.body._id;
    })
    test('Should get the specific note data', async () => {
        const res = await request(app)
            .get(`/notes/${newNoteId}`)
            .set('Authorization', `Bearer ${TOKEN}`);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(newNoteId);
    })

    test('Should edit the note data', async () => {
        const res = await request(app)
            .put(`/notes/edit/${newNoteId}`)
            .send({
                title: 'Note Edits',
                description: 'Note Edits were Successful?'
            })
            .set('Authorization', `Bearer ${TOKEN}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.msg).toBe('Note Edited successfully')
    })

    test('Should delete the note data',async()=>{
        const res = await request(app)
        .delete('/notes/delete')
        .send({
            id: newNoteId
        })
        .set('Authorization', `Bearer ${TOKEN}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.msg).toBe('Note deleted successfully')
    })
})