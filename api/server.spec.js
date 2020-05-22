const supertest = require('supertest'); 

// const server = require('./server'); 

const jokesServer = require('../jokes/jokes-router')

const authServer = require('../auth/auth-router')



describe('POST /Register', () => {
    it('should let a user register and log in', (done) => {
         supertest(authServer)
            .post('/login')
            .send({ username: "bigChung", password: "anotherpass" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err,res) {
                if(err) return done(err); 
                done(); 
            })
        return supertest(authServer)
            .post('/login')
            .send({username: 'bigChung', password: 'anotherpass'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err,res) {
                if(err) return done(err); 
                done(); 
            })
    })
})

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