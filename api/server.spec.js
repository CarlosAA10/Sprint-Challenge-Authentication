const supertest = require('supertest'); 

const server = require('./server'); 


const db = require('../database/dbConfig'); 

beforeEach(() => {
    return db.migrate.rollback().then(() => db.migrate.latest())
})







describe('POST /register and /login', () => {
    it('Post to register and user can sign in', async () => {
        const res =  await supertest(server).post('/api/auth/register').send({username: 'lilChung', password:"finalpassword"})
        console.log(res.body,'the res.body')
        expect(res.status).toBe(201); 
        const ares = await supertest(server)
        .post('/api/auth/login')
        .send({username: 'lilChung', password:"finalpassword"})
        console.log(ares.body, 'the 2nd res.body')
        expect(ares.status).toBe(200); 
    })
}) 

describe('POST /register and /login', () => {
    it('Post to register and user can sign in', async () => {
        const res =  await supertest(server).post('/api/auth/register').send({username: 'lilChung', password:"finalpassword"})
        console.log(res.body,'the res.body')
        expect(res.status).toBe(201); 

        const ares = await supertest(server)
        .post('/api/auth/login')
        .send({username: 'lilChug', password:"finalpassword"})
        console.log(ares.body, 'the 2nd res.body')
        expect(ares.status).toBe(401); 
        expect(ares.body.message).toBe("invalid credentials")
    })
}) 







// describe('POST /Register', () => {
//     it('should let a user register and log in', async() => {
 
//         const response = await supertest(server)
//             .post('/api/auth/register')
//             .send({ username: "bigChung10", password: "anotherpass" })
//             // .then(response => {
//                 console.log(response.body,'the response')
//                 console.log(response.status,'the status')
//                 expect(response.status).toBe(201) 
//             // })
//             // .end(function(err,res) {
//             //     if(err) return done(err); 
//             //     done(); 
//             // })
//         // return supertest(server)
//         //     .post('/api/auth/login')
//         //     .send({username: 'bigChung', password: 'anotherpass'})
//         //     .set('Accept', 'application/json')
//         //     .expect('Content-Type', /json/)
//         //     .expect(200)
//         //     .end(function(err,res) {
//         //         if(err) return done(err); 
//         //         done(); 
//         //     })
//     })
// })

// describe('POST /login', () => {
//     it('should return status code 200 if we are logging in', (done) => {
//         return supertest(authServer)
//             .post('/login')
//             .send({username: 'Chunguino', password: 'lamepass'})
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .end(function(err,res) {
//                 if(err) return done(err); 
//                 done(); 
//             })

//     })
// })

// describe('Get /', () => {
//     it('should return http status code 200', () => {
//          supertest(jokesServer)
//         .get('/')
//         .then(response => {
//             expect(response.status).toBe(200)
//         })
//     })
// })